import os
import sys
import time
import cv2
import numpy as np
import subprocess
import imageio_ffmpeg

def enhance_frame(frame, target_w, target_h):
    # 1. Bilateral filter on source to remove compression macroblocking
    denoised = cv2.bilateralFilter(frame, d=3, sigmaColor=25, sigmaSpace=25)
    
    # 2. High-quality Lanczos4 upscale
    upscaled = cv2.resize(denoised, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    
    # 3. Unsharp masking for razor-sharp edges on architectural lines & glass
    gaussian = cv2.GaussianBlur(upscaled, (0, 0), sigmaX=1.6)
    sharp = cv2.addWeighted(upscaled, 1.52, gaussian, -0.52, 0)
    
    # 4. Color grading: CLAHE on luminance for rich contrast & vibrant architectural glow
    lab = cv2.cvtColor(sharp, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=1.6, tileGridSize=(8, 8))
    l = clahe.apply(l)
    enhanced = cv2.merge((l, a, b))
    enhanced = cv2.cvtColor(enhanced, cv2.COLOR_LAB2BGR)
    
    # 5. Subtle saturation boost for glowing cyan & luxury warm glass reflections
    hsv = cv2.cvtColor(enhanced, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.15, 0, 255)
    enhanced = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    
    return enhanced

def main():
    start_time = time.time()
    source_video = r'C:\Estate\videos\realestate.mp4'
    output_video = r'C:\Estate\public\videos\hero_building_4k_loop.mp4'
    frames_dir = r'C:\Estate\public\frames'
    os.makedirs(frames_dir, exist_ok=True)
    os.makedirs(r'C:\Estate\public\videos', exist_ok=True)
    
    cap = cv2.VideoCapture(source_video)
    total_src_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    print(f"Reading source video: {source_video} ({total_src_frames} frames, {fps} fps)", flush=True)
    
    # Target resolution: 1140 x 2046 (3x scale, perfect vertical 4K retina proportion)
    target_w, target_h = 1140, 2046
    
    raw_frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        raw_frames.append(frame)
    cap.release()
    print(f"Read {len(raw_frames)} frames from source. Enhancing to {target_w}x{target_h}...", flush=True)
    
    enhanced_frames = []
    for idx, f in enumerate(raw_frames):
        enh = enhance_frame(f, target_w, target_h)
        enhanced_frames.append(enh)
        if idx % 30 == 0 or idx == len(raw_frames) - 1:
            print(f"  Enhanced frame {idx+1}/{len(raw_frames)}...", flush=True)
            
    # Build seamless ping-pong continuous loop
    # Forward: 0 to N-1
    # Hold at completed glass monolith: 15 frames
    # Reverse: N-1 down to 0
    # Hold at blueprint wireframe: 10 frames
    loop_sequence = []
    loop_sequence.extend(enhanced_frames)
    for _ in range(15):
        loop_sequence.append(enhanced_frames[-1])
    loop_sequence.extend(enhanced_frames[::-1])
    for _ in range(10):
        loop_sequence.append(enhanced_frames[0])
        
    print(f"Total loop frames: {len(loop_sequence)} (duration: {len(loop_sequence)/fps:.2f}s)", flush=True)
    
    # 1. Encode with FFmpeg
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg_exe,
        '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{target_w}x{target_h}',
        '-pix_fmt', 'bgr24',
        '-r', str(fps),
        '-i', '-',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '18', # High visual quality
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        output_video
    ]
    
    print("Encoding 4K continuous loop video with FFmpeg...", flush=True)
    # DEVNULL prevents pipe deadlock!
    process = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for f in loop_sequence:
        process.stdin.write(f.tobytes())
    process.stdin.close()
    process.wait()
    
    vid_size_mb = os.path.getsize(output_video) / (1024 * 1024)
    print(f"Created 4K video: {output_video} ({vid_size_mb:.2f} MB)", flush=True)
    
    # 2. Export 80 high-res WebP frames into public/frames/ using OpenCV native WebP (fast C++ libwebp)
    print("Exporting 80 sharp WebP frames...", flush=True)
    num_export_frames = 80
    indices = np.linspace(0, len(enhanced_frames) - 1, num_export_frames, dtype=int)
    for i, idx in enumerate(indices):
        pad_idx = str(i).zfill(2)
        frame_path = os.path.join(frames_dir, f'frame_{pad_idx}.webp')
        cv2.imwrite(frame_path, enhanced_frames[idx], [cv2.IMWRITE_WEBP_QUALITY, 90])
        
    print(f"Done! All processing completed in {time.time() - start_time:.2f} seconds.", flush=True)

if __name__ == '__main__':
    main()
