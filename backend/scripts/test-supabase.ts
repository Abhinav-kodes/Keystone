import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function testConnection() {
  console.log('🔌 Testing Supabase connection...\n');
  
  try {
    // Test 1: Check users table
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (userError) throw userError;
    
    console.log('✅ Users table accessible');
    console.log(`   Found ${users?.length || 0} user(s)`);
    
    // Test 2: Check all tables exist
    const tables = [
      'users',
      'test_sessions', 
      'question_responses',
      'concept_performance',
      'gap_detections',
      'repair_paths',
      'opik_evaluations',
      'system_events'
    ];
    
    console.log('\n📊 Verifying tables:');
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.log(`   ❌ ${table}: ${error.message}`);
      } else {
        console.log(`   ✅ ${table}`);
      }
    }
    
    console.log('\n✅ Supabase connection successful!\n');
    
  } catch (error: any) {
    console.error('\n❌ Connection failed:');
    console.error(error.message);
    console.error('\nCheck your .env:');
    console.error('- SUPABASE_URL');
    console.error('- SUPABASE_SERVICE_KEY\n');
    process.exit(1);
  }
}

testConnection();
