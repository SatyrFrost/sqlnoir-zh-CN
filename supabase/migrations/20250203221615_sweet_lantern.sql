/*
  # Fix user creation permissions

  1. Changes
    - Grant necessary permissions to service role
    - Ensure trigger has proper permissions
    - Add missing grants for auth schema

  2. Security
    - Maintains RLS while allowing system operations
*/

-- Grant necessary permissions to the service role
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON public.user_info TO service_role;

-- Grant permissions to the auth schema for the trigger
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT SELECT ON auth.users TO service_role;

-- Ensure the trigger function has proper permissions
ALTER FUNCTION handle_new_user() SECURITY DEFINER;

-- Ensure policies use the correct role
DROP POLICY IF EXISTS "System can create user info" ON user_info;
CREATE POLICY "System can create user info"
  ON user_info
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Ensure authenticated users can still manage their data
DROP POLICY IF EXISTS "Users can create their own info" ON user_info;
CREATE POLICY "Users can create their own info"
  ON user_info
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);