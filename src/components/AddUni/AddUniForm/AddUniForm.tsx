import React, { useState } from "react";
import "./AddUniForm.css";
import { useNavigate } from 'react-router-dom';


export interface UniData {
  uczelnia: string;
  kraj: string;
  szerokosc: string;
  dlugosc: string;
  opis: string;
}

interface Props {
  onSubmit: (data: UniData) => Promise<void>;
}

export default function AddUniForm({ onSubmit }: Props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UniData>({
    uczelnia: "",
    kraj: "",
    szerokosc: "",
    dlugosc: "",
    opis: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await onSubmit(formData); // jeśli onSubmit się powiedzie
      navigate('/'); // dopiero wtedy przekieruj
    } catch (error) {
      console.error("Błąd podczas dodawania uczelni:", error);
      // możesz też dodać np. komunikat o błędzie
    }
  };

  return (
    <div className="addUniFormBox">
      <h1>Dodaj Uczelnię</h1>

      <form className="addUniForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Uczelnia">Uczelnia</label>
          <input
            type="text"
            id="uczelnia"
            name="uczelnia"
            value={formData.uczelnia}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kraj">Kraj</label>
          <input
            type="text"
            id="kraj"
            name="kraj"
            value={formData.kraj}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="szerokosc">Szerokość geograficzna</label>
          <input
            type="number"
            step="any"
            id="szerokosc"
            name="szerokosc"
            value={formData.szerokosc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dlugosc">Długość geograficzna</label>
          <input
            type="number"
            step="any"
            id="dlugosc"
            name="dlugosc"
            value={formData.dlugosc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="opis">Opis</label>
          <textarea
            id="opis"
            name="opis"
            value={formData.opis}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <button type="submit" className="submit-button">
        Dodaj uczelnię
      </button>
      <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/')}
            >
              Anuluj
        </button>

      </form>
    </div>
  );
}
