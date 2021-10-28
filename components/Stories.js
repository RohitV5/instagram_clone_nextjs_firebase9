import faker from "faker";
import { useEffect, useState } from "react";
import Story from "./Story";
function Stories() {
  const [suggestions, setsuggestions] = useState([]);

  useEffect(() => {
    //bubbling up data using spread to get user data
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setsuggestions(suggestions);
  }, []);

  return (
    // returns a list of stories pulled from faker.js
    <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-sm scrollbar-thin scrollbar-thumb-black">
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
