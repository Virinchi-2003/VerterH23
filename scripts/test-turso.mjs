import { createClient } from '@libsql/client';

const url = 'libsql://vertexh-virinchi-2003.aws-ap-south-1.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTE0NDM5NjYsImlkIjoiMDFhMTFhNjEtODMwMS03MzU2LWJjNjMtMTkxZDIwZWY4OWRjIiwia2lkIjoiYzdhbkp0dS1RNE1rRUtCYlNEMlJ5TjI0X2ZsT3lZSE5qSmZHeS1PWTRfayIsInJpZCI6IjM0YzJkOGU4LWIwMTMtNDEwYi1hMzE4LTZlMmEwYWFhMGU3NyJ9.s2AaVYzrJFu7OAErNIMhHcQN_PDzgR1wjpXhVdAwq3B_Xiwhs1dxdwl6RD6pWn2i1Lddqw_Vi7JVRD5qNSH2BQ';

const client = createClient({
  url,
  authToken,
});

async function run() {
  try {
    const res = await client.execute('SELECT 1 as test');
    console.log('SUCCESS:', res.rows);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

run();
