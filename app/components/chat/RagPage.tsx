
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Loader2,
  Clock,
  MinusIcon,
  SquarePenIcon,
  ArrowUp,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  isError?: boolean;
};

const MotionImage = motion(Image);

function getErrorMessage(status: number): string {
  switch (status) {
    case 401:
      return "Your session has expired. Please log in again.";
    case 429:
      return "You've sent too many messages. Please wait a moment before trying again.";
    case 400:
      return "Your message couldn't be processed. Please try rephrasing.";
    default:
      return "Something went wrong on our end. Please try again shortly.";
  }
}

const dotVariants = {
  animate: {
    opacity: [0.3, 1, 0.3],
  },
};

const LoadingBubble = () => (
  <div className="flex gap-3 items-start">
    <div className="h-7 w-7 bg-[#006A4E] shrink-0 rounded-full overflow-hidden">
      <Image
        src="/ben10.png"
        alt="Assist10"
        width={28}
        height={28}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 flex items-center gap-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-green-500"
            variants={dotVariants}
            animate="animate"
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

function TypewriterText({
  text,
  onReveal,
}: {
  text: string;
  onReveal?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const textRef = useRef(text);
  const indexRef = useRef(0);

  useEffect(() => {
    textRef.current = text;

    // Restart if the content becomes shorter than what was revealed.
    if (text.length < indexRef.current) {
      indexRef.current = 0;
      setDisplayedText("");
    }
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      const total = textRef.current.length;
      const backlog = total - indexRef.current;

      if (backlog <= 0) return;

      const step = Math.max(1, Math.ceil(backlog / 15));
      indexRef.current = Math.min(total, indexRef.current + step);

      setDisplayedText(
        textRef.current.slice(0, indexRef.current)
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onReveal?.();
  }, [displayedText, onReveal]);

  return (
    <p className="text-sm whitespace-pre-wrap break-words">
      {displayedText}
    </p>
  );
}

const Bubble = ({
  message,
  userName,
  animate,
  onReveal,
}: {
  message: Message;
  userName?: string | null;
  animate: boolean;
  onReveal?: () => void;
}) => {
  const { content, role, timestamp, isError } = message;
  const isUser = role === "user";
  const initial = userName?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <motion.div
          className="h-7 w-7 bg-[#006A4E] shrink-0 rounded-full overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/ben10.png"
            alt="Assist10"
            height={28}
            width={28}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <div className="max-w-[85%] md:max-w-[70%]">
        <motion.div
          className={`rounded-lg p-3 ${
            isUser
              ? "bg-black/70 text-white"
              : isError
                ? "bg-amber-900/30 text-amber-200 border border-amber-700/50"
                : "bg-gray-800/50 text-gray-100 border border-gray-700/50"
          }`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isError && (
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span className="text-xs text-amber-400 font-medium">
                Notice
              </span>
            </div>
          )}

          {animate ? (
            <TypewriterText
              text={content}
              onReveal={onReveal}
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap break-words">
              {content}
            </p>
          )}
        </motion.div>

        {timestamp && (
          <span className="text-xs text-gray-500 mt-1 block">
            {timestamp}
          </span>
        )}
      </div>

      {isUser && (
        <motion.div
          className="h-7 w-7 shrink-0 rounded-full bg-[#006A4E] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs text-white font-bold">
            {initial}
          </span>
        </motion.div>
      )}
    </div>
  );
};

const LoginPrompt = ({
  onClose,
}: {
  onClose?: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col radial-bg-dark items-center justify-center h-full space-y-6 p-8">
      <div className="bg-green-600/10 rounded-full p-6 border border-green-500">
        <Lock className="h-12 w-12 text-green-500" />
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-white">
          Authentication Required
        </h2>
        <p className="text-sm text-gray-400 max-w-md">
          Please log in to access Assist10 and get personalized help
          about Ben 10 aliens!
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => router.push("/login")}
          className="bg-green-600 hover:bg-green-500 text-white"
        >
          Log In
        </Button>

        <Button
          onClick={onClose}
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default function RagPage({
  onClose,
}: {
  onClose?: () => void;
}) {
  const { data: session, isPending } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  const isLoggedIn = !!session?.user;
  const userId = session?.user?.id;
  const userName = session?.user?.name ?? null;

  // Load chat history.
  useEffect(() => {
    if (!isLoggedIn || !userId) {
      setMessages([]);
      return;
    }

    let cancelled = false;

    const loadChatHistory = async () => {
      try {
        const response = await fetch("/api/chat/history");

        if (!response.ok) {
          throw new Error(`History request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setMessages(
            Array.isArray(data.messages) ? data.messages : []
          );
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load chat history:", error);
        }
      }
    };

    void loadChatHistory();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, userId]);

  // Auto-scroll when messages change.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a message and stream the response.
  const sendMessage = async (text: string) => {
    const question = text.trim();

    if (!question || !isLoggedIn || loading) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const historySnapshot = [...messages];

    const userMessage: Message = {
      role: "user",
      content: question,
      timestamp,
    };

    // This index identifies the assistant placeholder.
    const assistantIndex = historySnapshot.length + 1;

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        role: "assistant",
        content: "",
        timestamp,
      },
    ]);

    setTypingIndex(assistantIndex);
    setInput("");
    setLoading(true);

    const updateAssistantMessage = (
      content: string,
      isError = false
    ) => {
      setMessages((prev) =>
        prev.map((message, index) =>
          index === assistantIndex
            ? {
                role: "assistant",
                content,
                timestamp,
                ...(isError ? { isError: true } : {}),
              }
            : message
        )
      );
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          history: historySnapshot,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        updateAssistantMessage(
          typeof errorData.error === "string"
            ? errorData.error
            : getErrorMessage(response.status),
          true
        );

        return;
      }

      if (!response.body) {
        throw new Error("The response has no readable stream.");
      }

      // Expects a raw plain-text stream from the API.
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        fullText += decoder.decode(value, {
          stream: true,
        });

        updateAssistantMessage(fullText);
      }

      fullText += decoder.decode();
      updateAssistantMessage(fullText);

      if (!fullText.trim()) {
        updateAssistantMessage(
          "I couldn't generate a response. Please try again.",
          true
        );
      }
    } catch (error) {
      console.error("Failed to send chat message:", error);

      updateAssistantMessage(
        "Unable to reach the server. Please check your connection and try again.",
        true
      );
    } finally {
      setLoading(false);
    }
  };

  // Clear the conversation.
  const handleClearChat = async () => {
    if (loading) return;

    setTypingIndex(null);
    setMessages([]);

    if (!isLoggedIn) return;

    try {
      const response = await fetch("/api/chat/history", {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(
          "Failed to clear chat history:",
          response.status
        );
      }
    } catch (error) {
      console.error("Failed to clear chat history:", error);
    }
  };

  if (isPending) {
    return (
      <div className="h-[60dvh] w-[min(60vh,calc(100vw-2rem))] radial-bg flex items-center justify-center rounded-xl z-50 fixed bottom-5 right-5">
        <LoadingBubble />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="h-[60dvh] w-[min(60vh,calc(100vw-2rem))] radial-bg flex rounded-xl z-50 fixed bottom-5 right-5">
        <LoginPrompt onClose={onClose} />
      </div>
    );
  }

  return (
    <div className="h-[60dvh] w-[min(60vh,calc(100vw-2rem))] border border-[#00FF00]/30 radial-bg-dark flex flex-col rounded-xl z-50 fixed bottom-5 right-5">
      {/* Top bar */}
      <header className="border-b border-gray-800 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-400">Today</span>
        </div>

        <div className="flex flex-row gap-4">
          <button
            type="button"
            onClick={handleClearChat}
            disabled={loading}
            aria-label="New Chat"
            className="text-gray-500 hover:text-green-500 disabled:opacity-50 transition-colors"
          >
            <SquarePenIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close"
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="md:max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-8 pt-8">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="bg-green-600/10 rounded-full border border-green-500 overflow-hidden">
                    <MotionImage
                      src="/ben10.png"
                      width={64}
                      height={64}
                      alt="Ben10"
                      className="object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                <h2 className="md:text-2xl font-bold text-white">
                  Meet Assist10!
                </h2>

                <p className="text-sm md:text-base text-gray-400 max-w-md">
                  Ask me anything about Ben 10 alien explorer!
                </p>

                {userName && (
                  <p className="text-xs text-green-500">
                    Welcome back, {userName}!
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {messages.map((message, index) => {
                const isWaitingForResponse =
                  loading &&
                  index === typingIndex &&
                  message.role === "assistant" &&
                  message.content === "";

                if (isWaitingForResponse) {
                  return <LoadingBubble key={index} />;
                }

                return (
                  <Bubble
                    key={index}
                    message={message}
                    userName={userName}
                    animate={index === typingIndex}
                    onReveal={scrollToBottom}
                  />
                );
              })}

              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-gray-800 p-4 shrink-0">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void sendMessage(input);
          }}
          className="md:max-w-3xl mx-auto"
        >
          <div className="flex gap-2 radial-bg-dark border border-gray-700 rounded-full p-2 focus-within:border-green-500/50 transition-colors">
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me about something..."
              disabled={loading}
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-gray-500"
            />

            <Button
              type="submit"
              disabled={loading || !input.trim()}
              size="icon"
              className="bg-green-600 hover:bg-green-500 disabled:bg-gray-700 shrink-0 rounded-full"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={32} />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}