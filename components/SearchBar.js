"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2 || selectedApp) return;

      try {
        const res = await axios.get(
          `http://localhost:8000/get_suggestions?query=${query}`
        );
        setSuggestions(res.data);
      } catch (err) {
        console.error("Error fetching suggestions", err);
      }
    };

    fetchSuggestions();
  }, [query, selectedApp]);

  const handleSelect = (app) => {
    setSelectedApp(app);
    setQuery(app.name);
    setSuggestions([]);
    setSentimentData(null);
  };

  const handleGetSentiment = async () => {
    if (!selectedApp || loading) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/get_sentiment?package_id=${selectedApp.packageId}`
      );
      setSentimentData(res.data);
    } catch (err) {
      console.error("Error fetching sentiment", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <div style={{ position: "relative", width: "300px" }}>
        <input
          type="text"
          value={query}
          placeholder="Search app name..."
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedApp(null);
            setSentimentData(null);
          }}
          style={{ padding: "8px", width: "100%" }}
        />
        {!selectedApp && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            style={{
              border: "1px solid #ccc",
              borderTop: "none",
              position: "absolute",
              width: "100%",
              maxHeight: "150px",
              overflowY: "auto",
              backgroundColor: "white",
              zIndex: 10,
            }}
          >
            {suggestions.map((app) => (
              <div
                key={app.packageId}
                onClick={() => handleSelect(app)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {app.name}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={handleGetSentiment}
            disabled={!selectedApp || loading}
            style={{ padding: "8px 16px", width: "100%" }}
          >
            {loading ? "Loading..." : "Get Sentiment"}
          </button>
        </div>
        {sentimentData && (
          <div style={{ marginTop: "20px" }}>
            <p>Sentiment Score: {sentimentData.score}</p>
            <p>Total Reviews: {sentimentData.totalReviews}</p>
          </div>
        )}
      </div>
    </div>
  );
}
