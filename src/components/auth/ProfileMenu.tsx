import React, { useState, useEffect } from "react";
import { LogOut, Award, X } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  user: any;
}

export function ProfileMenu({
  isOpen,
  onClose,
  onSignOut,
  user,
}: ProfileMenuProps) {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserInfo() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("user_info")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      fetchUserInfo();
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop to handle clicks outside the menu */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Profile Menu */}
      <div className="fixed inset-x-0 mx-4 mt-2 lg:absolute lg:right-0 lg:left-auto lg:mx-0 w-auto lg:w-72 bg-white rounded-lg shadow-lg py-1 border border-amber-200 z-50">
        <div className="p-4 border-b border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-detective text-lg text-amber-900">
              Detective Profile
            </h3>
            <button
              onClick={onClose}
              className="text-amber-500 hover:text-amber-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm font-medium text-amber-900 truncate">
            {user.email}
          </p>
        </div>

        <div className="p-4 border-b border-amber-200">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-amber-900">
                Experience Points
              </p>
              <p className="text-lg font-detective text-amber-700">
                {loading ? "..." : userInfo?.xp || 0} XP
              </p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs text-amber-600">
              Cases Solved:{" "}
              {loading ? "..." : userInfo?.completed_cases?.length || 0}
            </p>
          </div>
        </div>

        <button
          onClick={onSignOut}
          className="w-full text-left px-4 py-3 text-sm text-amber-900 hover:bg-amber-50 
                   flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );
}
