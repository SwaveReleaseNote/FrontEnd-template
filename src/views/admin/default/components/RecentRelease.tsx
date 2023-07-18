import Card from "../../../../components/card";
import { loginState } from "../../../../context/atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import React, { useState, useEffect } from "react";

type NoteBlock = {
  noteBlockContext: string;
};

type RecentReleaseNote = {
  version: string;
  lastModifiedDate: string;
  releaseDate: string;
  noteBlocks: NoteBlock[];
};

const RecentRelease = () => {
  const login = useRecoilValue(loginState);
  const [recentReleaseNote, setRecentReleaseNote] = useState<
    RecentReleaseNote | undefined
  >(); // Set initial state as undefined

  // fetch All Members
  const fetchRecentReleaseNote = async () => {
    try {
      const response = await axios.get(
        `localhost:8080/api/project/release/load_recent`
      );

      setRecentReleaseNote(response.data);
    } catch (error) {
      console.error("Error fetching recent release note:", error);
      console.log("Mocking");
      mockFetchRecentRelease();
    }
  };

  const mockFetchRecentRelease = () => {
    // Simulate API response with mock data
    const mockResponse: RecentReleaseNote = {
      version: "3.6.7",
      lastModifiedDate: new Date().toString(),
      releaseDate: new Date().toString(),
      noteBlocks: [
        {
          noteBlockContext: "release note context1",
        },
        {
          noteBlockContext: "release note context2",
        },
      ],
    };

    setRecentReleaseNote(mockResponse);
  };

  // First Rendering
  useEffect(() => {
    console.log("Recent Release Page rendered");
    fetchRecentReleaseNote();
  }, []);

  return (
    <Card extra={"w-full h-full p-3 mt-2"}>
      <div className="mb-8 mt-2 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
        <p className="text-4xl">🆕</p>Recent Release Note
        </h4>
        {/* Conditional rendering based on whether recentReleaseNote is defined */}
        {recentReleaseNote ? (
          <>
            <h4 className="px-2 text-l font-bold text-navy-700 dark:text-white">
              version: {recentReleaseNote.version}
            </h4>
            <h4 className="px-2 text-l font-bold text-navy-700 dark:text-white">
              lastModifiedDate: {recentReleaseNote.lastModifiedDate}
            </h4><h4 className="px-2 text-l font-bold text-navy-700 dark:text-white">
              releaseDate: {recentReleaseNote.releaseDate}
            </h4>
            {recentReleaseNote.noteBlocks.map((noteBlock) => (
              <p key={noteBlock.noteBlockContext} className="mt-2 px-2 text-base text-gray-600">
                {noteBlock.noteBlockContext}
              </p>
            ))}
          </>
        ) : (
          <p>Loading recent release note...</p>
        )}
      </div>
    </Card>
  );
};

export default RecentRelease;
