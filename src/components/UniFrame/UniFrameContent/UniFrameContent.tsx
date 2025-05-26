// UniFrameContent.tsx
import React, { useEffect, useState } from "react";
import "./UniFrameContent.css";
import { useHoverStore } from "@/zustand/useHoverStore";
import { getUniversityInfo } from "./uniInfo";
import { UniversityInfo } from "@/uniInfoPromise";

function formatYMD(d: string) {
  const date = new Date(d);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
export default function UniFrameContent() {
  const clickedUni = useHoverStore((s) => s.clickedName);
  const isNew = useHoverStore((s) => s.isNew);
  const [uniInfo, setUniInfo] = useState<UniversityInfo | null>(null);

  useEffect(() => {
    if (!clickedUni) {
      setUniInfo(null);
      return;
    }
    (async () => {
      const info = await getUniversityInfo(clickedUni, isNew ?? false);
      setUniInfo(info);
    })();
  }, [clickedUni, isNew]);

  if (!clickedUni || !uniInfo) {
    return <div className="uniFrameContent"></div>;
  }

  return (
    <div className="uniFrameContent">
      <div className="uniNameBox">
        <h1>{clickedUni}</h1>
      </div>

      {uniInfo.kind === "new" ? (
        <NewUniInfoDisplay info={uniInfo} />
      ) : (
        <ExistingUniInfoDisplay info={uniInfo} />
      )}
    </div>
  );
}

function NewUniInfoDisplay({
  info,
}: {
  info: Extract<UniversityInfo, { kind: "new" }>;
}) {
  return (
    <>
      <div className="mainInfoBox">
        <div>
          <h3>Państwo:</h3>
          <h1>{info.Country}</h1>
        </div>
        <div>
          <h3>Data dodania:</h3>
          <h1>{formatYMD(info.created_at)}</h1>
        </div>
      </div>
      <div className="descriptionBox">
        <p>{info.description}</p>
      </div>
    </>
  );
}

function ExistingUniInfoDisplay({
  info,
}: {
  info: Extract<UniversityInfo, { kind: "existing" }>;
}) {
  return (
    <>
      <div className="mainInfoBox">
        <div>
          <h3>Ranking Światowy:</h3>
          <h1>#{info.WorldRank}</h1>
        </div>
        <div>
          <h3>Ranking Krajowy:</h3>
          <h1>#{info.NationalRank}</h1>
        </div>
        <div>
          <h3>Państwo:</h3>
          <h1>{info.Country}</h1>
        </div>
        <div>
          <h3>Wynik:</h3>
          <h1>{info.Score}</h1>
        </div>
      </div>
      <div className="descriptionBox">
        <p>{info.description}</p>
      </div>
    </>
  );
}
