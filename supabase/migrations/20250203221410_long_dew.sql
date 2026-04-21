/*
  # Create user info table

  1. New Tables
    - `user_info`
      - `id` (uuid, primary key, matches auth.users.id)
      - `xp` (integer, default 0)
      - `completed_cases` (jsonb array, stores completed case IDs)
      - `case_answers` (jsonb, stores case ID to answer mapping)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_info` table
    - Add policies for:
      - Users can read only their own data
      - Users can update only their own data
      - System can create new records on user signup
*/

-- Create user info table
CREATE TABLE user_info (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  xp integer DEFAULT 0,
  completed_cases jsonb DEFAULT '[]'::jsonb,
  case_answers jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_info ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own info"
  ON user_info
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own info"
  ON user_info
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_info_updated_at
  BEFORE UPDATE ON user_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_info (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();