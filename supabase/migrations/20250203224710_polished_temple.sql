/*
  # Add XP increment function

  1. New Functions
    - `increment_user_xp`: Safely increments user XP and updates completed cases
      - Parameters:
        - user_id (uuid)
        - xp_amount (integer)
        - case_id (text)
        - cases_array (jsonb)

  2. Security
    - Function is accessible to authenticated users
    - Users can only update their own data
*/

-- Create the function to increment XP and update completed cases
CREATE OR REPLACE FUNCTION increment_user_xp(
  user_id uuid,
  xp_amount integer,
  case_id text,
  cases_array jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update user info with incremented XP and new completed cases
  UPDATE user_info
  SET 
    xp = COALESCE(xp, 0) + xp_amount,
    completed_cases = cases_array,
    updated_at = now()
  WHERE id = user_id
  AND auth.uid() = user_id; -- Ensure user can only update their own data

  -- If no rows were updated, the user doesn't exist or doesn't have permission
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Unable to update user progress';
  END IF;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_user_xp TO authenticated;