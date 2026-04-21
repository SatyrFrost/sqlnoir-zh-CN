/*
  # Fix user creation with proper trigger setup

  1. Changes
    - Drop existing trigger and function
    - Recreate with proper permissions and timing
    - Ensure proper execution order

  2. Security
    - Maintains RLS while allowing system operations
    - Uses security definer with proper search path
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Recreate function with proper security context
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_info (id)
  VALUES (NEW.id);
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION handle_new_user() TO service_role;

-- Recreate trigger with proper timing
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Ensure proper permissions
GRANT USAGE ON SCHEMA public TO authenticated, service_role;
GRANT ALL ON public.user_info TO authenticated, service_role;

-- Recreate policies with proper roles
DROP POLICY IF EXISTS "Users can read own info" ON user_info;
CREATE POLICY "Users can read own info"
  ON user_info
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own info" ON user_info;
CREATE POLICY "Users can update own info"
  ON user_info
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "System can create user info" ON user_info;
CREATE POLICY "System can create user info"
  ON user_info
  FOR INSERT
  TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can create their own info" ON user_info;
CREATE POLICY "Users can create their own info"
  ON user_info
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);