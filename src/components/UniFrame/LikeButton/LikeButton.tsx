import React, { useState, useEffect, useCallback } from "react";
import "./LikeButton.css";
import supabase from "@/config/supabaseClient";
import { useIsLoggedIn } from "@/config/isLoggedIn";
import { useHoverStore } from "@/zustand/useHoverStore";
import { findUser } from "@/config/loggedUser";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const user = findUser();
  const currentUni = useHoverStore((s) => s.clickedName);
  const isNewCurrent = useHoverStore((s) => s.isNew);

  // Sprawdza, czy mamy już like dla danego uni i usera
  const checkIfLiked = useCallback(async () => {
    if (!user?.id || !currentUni) {
      setLiked(false);
      return;
    }
    const { data, error } = await supabase
      .from("ulubione")
      .select("id")
      .match({
        uni_name: currentUni,
        user_id: user.id,
      });

    if (error) {
      console.error("Błąd sprawdzania ulubionych:", error);
      setLiked(false);
      return;
    }
    setLiked(Array.isArray(data) && data.length > 0);
  }, [currentUni, user]);

  // Dodaje like
  const addLike = async () => {
    if (!user?.id || !currentUni) return;
    const { error } = await supabase
      .from("ulubione")
      .insert([
        {
          uni_name: currentUni,
          user_id: user.id,
          is_new: isNewCurrent,
        },
      ]);
    if (error) console.error("Insert failed:", error);
  };

  // Usuwa like
  const removeLike = async () => {
    if (!user?.id || !currentUni) return;
    const { error } = await supabase
      .from("ulubione")
      .delete()
      .match({
        uni_name: currentUni,
        user_id: user.id,
      });
    if (error) console.error("Usuń ulubione nie powiodło się:", error);
  };

  // Przełącznik – wykona najpierw operację w supabase, potem zmieni stan
  const toggleLike = async () => {
    if (liked) {
      await removeLike();
      setLiked(false);
    } else {
      await addLike();
      setLiked(true);
    }
  };

  // Przy każdej zmianie currentUni lub user przeladuj stan liked
  useEffect(() => {
    checkIfLiked();
  }, [checkIfLiked]);

  // Jeżeli nie jesteśmy zalogowani, nie renderujemy przycisku
  if (!isLoggedIn) return null;

  return (
    <button
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={toggleLike}
      aria-label={liked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
    >
      <svg
        className="heart-icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
             5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
             4.5 2.09C13.09 3.81 14.76 3 
             16.5 3 19.58 3 22 5.42 22 
             8.5c0 3.78-3.4 6.86-8.55 
             11.54L12 21.35z"
        />
      </svg>
      <span className="like-text">{liked ? "Liked" : "Like"}</span>
    </button>
  );
}
