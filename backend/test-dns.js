#!/usr/bin/env node

/**
 * DNS Testing Script
 * Run this to diagnose MongoDB Atlas DNS resolution issues
 * Usage: node test-dns.js
 */

import dns from 'dns';
import { runFullDiagnostics } from './src/utils/dnsResolver.js';

console.log('📋 System DNS Configuration:');
console.log('Current DNS Servers:', dns.getServers());
console.log('\n');

// Run diagnostics with system DNS
runFullDiagnostics().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
