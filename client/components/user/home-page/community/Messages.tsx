"use client";

import React, { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Message from "./Message";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ForumTopic {
  tid: number;
  title: string;
  timestamp: number;
  timestampISO: string;
  user: {
    uid: number;
    username: string;
    userslug: string;
    picture: string | null;
    displayname: string;
    "icon:bgColor": string;
    "icon:text": string;
  };
  category: {
    cid: number;
    name: string;
    slug: string;
    icon: string;
    bgColor: string;
    color: string;
  };
  teaser?: {
    content: string;
    timestamp: number;
    timestampISO: string;
    user: {
      uid: number;
      username: string;
      userslug: string;
      picture: string | null;
      displayname: string;
      "icon:bgColor": string;
      "icon:text": string;
    };
  };
}

interface ForumApiResponse {
  topics: ForumTopic[];
  topicCount: number;
  nextStart: number;
}

const Messages = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to format elapsed time
  const getElapsedTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  // Function to get user avatar - use original fallback avatars for now
  const getUserAvatar = (user: ForumTopic["user"]): string => {
    // Use original fallback avatars for consistent display
    const fallbackAvatars = [
      "https://i.imgur.com/3V5GBQW.jpeg",
      "https://i.imgur.com/mKHkbb4.jpeg",
      "https://i.imgur.com/sNXftlo.jpeg",
      "https://i.imgur.com/t7qc2Bc.jpeg",
      "https://i.imgur.com/YNMQ5V5.jpeg",
    ];

    return (
      fallbackAvatars[user.uid % fallbackAvatars.length] || fallbackAvatars[0]
    );
  };

  // Function to get user initials
  const getUserInitials = (user: ForumTopic["user"]): string => {
    const name = user.displayname || user.username || "U";
    return name.charAt(0).toUpperCase();
  };

  // Function to get user avatar color
  const getUserColor = (user: ForumTopic["user"]): string => {
    if (user["icon:bgColor"]) {
      return user["icon:bgColor"];
    }

    // Generate consistent colors based on user ID
    const colors = [
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffeb3b",
      "#ffc107",
      "#ff9800",
      "#ff5722",
      "#795548",
    ];

    return colors[user.uid % colors.length] || "#e91e63";
  };

  // Function to transform forum data to message format
  const transformForumData = (topics: ForumTopic[]): any[] => {
    return topics.map((topic, index) => {
      const message = topic.teaser?.content
        ? topic.teaser.content.replace(/<[^>]*>/g, "").trim() // Remove HTML tags
        : topic.title || "No message content available";

      return {
        id: topic.tid.toString(),
        avatar: getUserAvatar(topic.user),
        username: topic.user.displayname || topic.user.username,
        elapsedTime: getElapsedTime(topic.timestamp),
        message: message,
        // Add data for custom avatar generation
        userInitials: getUserInitials(topic.user),
        userColor: getUserColor(topic.user),
        hasRealAvatar: false, // Since we're not getting real profile pics
      };
    });
  };

  // Fetch data from forum API
  useEffect(() => {
    const fetchForumData = async () => {
      try {
        setLoading(true);
        setError(null);

        const testResponse = await fetch("/api/test-forum");
        const testData = await testResponse.json();

        // Use Next.js API route to avoid CORS issues
        const response = await fetch("/api/forum/recent?page=1", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ForumApiResponse = await response.json();

        if (data.topics && data.topics.length > 0) {
          // Filter out blog posts - only keep forum categories
          const forumCategories = [
            "general discussion",
            "announcements",
            "comments & feedback",
            "discussion",
            "forum",
            "help",
            "support",
          ];

          const forumTopics = data.topics.filter((topic) => {
            const categoryName = topic.category?.name?.toLowerCase() || "";

            // Include if it's a known forum category OR exclude if it's specifically blogs
            const isForumCategory = forumCategories.includes(categoryName);
            const isNotBlog =
              !categoryName.includes("blog") && categoryName !== "blogs";
            const shouldInclude = isForumCategory || isNotBlog;

            return shouldInclude;
          });

          if (forumTopics.length > 0) {
            const transformedMessages = transformForumData(forumTopics);
            setMessages(transformedMessages);
          } else {
            setMessages([
              {
                id: "fallback-001",
                avatar: "https://i.imgur.com/3V5GBQW.jpeg",
                username: "Forum Admin",
                elapsedTime: "Just now",
                message:
                  "Welcome to the Tech HCD Forum! Start a discussion to see forum posts here.",
                userInitials: "F",
                userColor: "#2196f3",
                hasRealAvatar: false,
              },
            ]);
          }
        }
      } catch (err) {
        console.error("Error fetching forum data:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(`Failed to load forum messages: ${errorMessage}`);

        setMessages([
          {
            id: "001",
            avatar: "https://i.imgur.com/3V5GBQW.jpeg",
            username: "kevin dias",
            elapsedTime: "7 minutes ago",
            message:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            userInitials: "K",
            userColor: "#e91e63",
            hasRealAvatar: false,
          },
          {
            id: "002",
            avatar: "https://i.imgur.com/mKHkbb4.jpeg",
            username: "kevin dias",
            elapsedTime: "7 minutes ago",
            message:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            userInitials: "K",
            userColor: "#9c27b0",
            hasRealAvatar: false,
          },
          {
            id: "003",
            avatar: "https://i.imgur.com/sNXftlo.jpeg",
            username: "kevin dias",
            elapsedTime: "7 minutes ago",
            message:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            userInitials: "K",
            userColor: "#673ab7",
            hasRealAvatar: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchForumData();
  }, []);

  useGSAP(
    () => {
      const messages = containerRef.current?.querySelectorAll(".forum-message");

      messages?.forEach((e) => {
        gsap.from(e, {
          duration: 1,
          opacity: 0,
          xPercent: -5,
          filter: "blur(10px)",
          scrollTrigger: {
            trigger: e,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [messages] },
  );

  if (loading) {
    return (
      <ul
        ref={containerRef}
        className="group home-page-community mt-[2em] space-y-[1em] text-[14px] sm:text-[16.5px] md:text-[19px] lg:text-[21.5px] xl:text-[24px] 2xl:text-[26.5px]"
      >
        <li className="forum-message py-4 text-center">
          Loading forum messages...
        </li>
      </ul>
    );
  }

  if (error) {
    console.warn("Forum API error:", error);
    return (
      <ul
        ref={containerRef}
        className="group home-page-community mt-[2em] space-y-[1em] text-[14px] sm:text-[16.5px] md:text-[19px] lg:text-[21.5px] xl:text-[24px] 2xl:text-[26.5px]"
      >
        <li className="forum-message py-4 text-center text-red-500">{error}</li>
        <li className="forum-message py-2 text-center text-sm text-gray-500">
          Showing fallback data below
        </li>
      </ul>
    );
  }

  return (
    <ul
      ref={containerRef}
      className="group home-page-community mt-[2em] space-y-[1em] text-[14px] sm:text-[16.5px] md:text-[19px] lg:text-[21.5px] xl:text-[24px] 2xl:text-[26.5px]"
    >
      {messages.map((e, i) => (
        <Message
          key={e.id}
          i={i}
          id={e.id}
          avatar={e.avatar}
          username={e.username}
          elapsedTime={e.elapsedTime}
          message={e.message}
          userInitials={e.userInitials}
          userColor={e.userColor}
          hasRealAvatar={e.hasRealAvatar}
        />
      ))}
    </ul>
  );
};

export default Messages;
