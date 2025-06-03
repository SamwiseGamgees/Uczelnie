import { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react"; // przykładowy hook auth
import './FauriteUnis.css';

export default function FavouriteUnis() {
  const user = useUser();                   // <-- HOOK w górnej części komponentu
  type Favourite = { uni_name: string; created_at: string };
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavourites([]);
      setLoading(false);
      return;
    }

    const fetchFavourites = async () => {
      try {
        const { data, error } = await supabase
          .from("ulubione")
          .select("uni_name, created_at")
          .eq("user_id", user.id);
        if (error) {
          console.error(error);
        } else {
          setFavourites(data || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [user]);

  if (loading) return <p>Ładowanie…</p>;
  if (!user) return <p>Zaloguj się, aby zobaczyć ulubione.</p>;
  if (favourites.length === 0)
    return <p>Brak ulubionych uczelni.</p>;

  return (
    <div className="fav-grid">
      {favourites.map((f, i) => (
        <div key={i} className="fav-card">
          <div className="fav-name">{f.uni_name}</div>
          <div className="fav-date">
            {new Date(f.created_at).toLocaleString("pl-PL", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}
    </div>
  );
  
}
