#!/usr/bin/env node

/**
 * Setup Helper Script
 * Run this to generate a password hash and set up your admin credentials
 */

import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n🔐 Portfolio Admin Setup\n');

  const email = await question('Admin Email: ');
  const password = await question('Admin Password: ');
  const passwordConfirm = await question('Confirm Password: ');

  if (password !== passwordConfirm) {
    console.log('❌ Passwords do not match!');
    rl.close();
    return;
  }

  try {
    console.log('\n⏳ Generating password hash...');
    const hash = await bcrypt.hash(password, 10);

    console.log('\n✅ Setup Complete!\n');
    console.log('Add these to your .env file:\n');
    console.log(`ADMIN_EMAIL=${email}`);
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('\nAlso set a JWT_SECRET (any random string):\n');
    console.log(`JWT_SECRET=your-random-secret-key-${Math.random().toString(36).substring(7)}`);
    console.log('\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  rl.close();
}

main();
