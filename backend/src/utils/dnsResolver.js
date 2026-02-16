/**
 * DNS Resolver Utility
 * Provides diagnostic tools for DNS resolution issues with MongoDB Atlas
 */

import dns from 'dns';
import { promisify } from 'util';

const resolve4 = promisify(dns.resolve4);
const resolve6 = promisify(dns.resolve6);
const resolveMx = promisify(dns.resolveMx);
const resolveSrv = promisify(dns.resolveSrv);
const getServers = dns.getServers;

/**
 * Test DNS resolution for MongoDB Atlas
 */
export const testMongoDBDNS = async () => {
  const mongoHost = 'cluster0.hmrd4ev.mongodb.net';
  
  console.log('\n🔍 MongoDB DNS Resolution Diagnostics:');
  console.log('═'.repeat(60));
  
  try {
    // Test IPv4 resolution
    console.log(`\n📡 Testing IPv4 resolution for: ${mongoHost}`);
    const ipv4Addresses = await resolve4(mongoHost);
    console.log(`✅ IPv4 Addresses: ${ipv4Addresses.join(', ')}`);
  } catch (err) {
    console.error(`❌ IPv4 Resolution failed: ${err.message}`);
  }

  try {
    // Test IPv6 resolution
    console.log(`\n📡 Testing IPv6 resolution for: ${mongoHost}`);
    const ipv6Addresses = await resolve6(mongoHost);
    console.log(`✅ IPv6 Addresses: ${ipv6Addresses.join(', ')}`);
  } catch (err) {
    console.warn(`⚠️  IPv6 Resolution failed: ${err.message} (This is often expected)`);
  }

  try {
    // Test SRV records (used by MongoDB Atlas for connection strings)
    console.log(`\n📡 Testing SRV records for MongoDB`);
    const srvRecords = await resolveSrv(`_mongodb._tcp.${mongoHost}`);
    console.log(`✅ SRV Records found:`);
    srvRecords.forEach(record => {
      console.log(`   - ${record.name}:${record.port} (priority: ${record.priority})`);
    });
  } catch (err) {
    console.warn(`⚠️  SRV Records not found: ${err.message}`);
  }

  // Show current DNS servers
  const currentServers = getServers();
  console.log(`\n🔧 Current DNS Servers: ${currentServers.join(', ')}`);
  console.log('═'.repeat(60) + '\n');
};

/**
 * Test connectivity to MongoDB Atlas host
 */
export const testMongoDBConnectivity = async () => {
  const { createConnection } = await import('net');
  const mongoHost = 'cluster0.hmrd4ev.mongodb.net';
  const mongoPort = 27017;

  return new Promise((resolve) => {
    console.log(`\n🌐 Testing TCP connection to MongoDB: ${mongoHost}:${mongoPort}`);
    
    const socket = createConnection(mongoPort, mongoHost, () => {
      console.log(`✅ TCP connection successful to MongoDB`);
      socket.destroy();
      resolve(true);
    });

    socket.on('error', (err) => {
      console.error(`❌ TCP connection failed: ${err.message}`);
      resolve(false);
    });

    socket.setTimeout(5000, () => {
      console.error(`❌ TCP connection timeout (5s)`);
      socket.destroy();
      resolve(false);
    });
  });
};

/**
 * Run full DNS diagnostics
 */
export const runFullDiagnostics = async () => {
  console.log('\n\n🚀 Running Full MongoDB DNS Diagnostics...\n');
  
  try {
    await testMongoDBDNS();
    await testMongoDBConnectivity();
    console.log('\n✅ Diagnostics complete!\n');
  } catch (err) {
    console.error(`\n❌ Diagnostics error: ${err.message}\n`);
  }
};

export default {
  testMongoDBDNS,
  testMongoDBConnectivity,
  runFullDiagnostics,
};
