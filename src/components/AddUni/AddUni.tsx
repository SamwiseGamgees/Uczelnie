import supabase from "config/supabaseClient";
import AddUniForm, { UniData } from "./AddUniForm/AddUniForm";

export default function AddUni() {
  const handleAddUniversity = async (data: UniData) => {
    const { data: uni, error: err1 } = await supabase
      .from("nowe_uczelnie")
      .insert([
        {
          University: data.uczelnia,
          Country: data.kraj,
          Latitude: data.szerokosc,
          Longitude: data.dlugosc,
          Description: data.opis,
        },
      ]);
    
    if (err1) console.error("Insert failed:", err1);
    else console.log("Dodano uczelnię:", data);
  };

  return <AddUniForm onSubmit={handleAddUniversity} />;
}
