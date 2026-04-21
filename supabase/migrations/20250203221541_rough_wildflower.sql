/*
  # Add insert policy for user_info table

  1. Changes
    - Add policy to allow system to insert new user records
    - This policy is required for the handle_new_user trigger to work

  2. Security
    - Policy uses service_role to ensure only the system can create records
*/

-- Add insert policy for the trigger to work
CREATE POLICY "System can create user info"
  ON user_info
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Also add a policy for authenticated users to insert their own record as fallback
CREATE POLICY "Users can create their own info"
  ON user_info
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);