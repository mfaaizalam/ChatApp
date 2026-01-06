import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const { authUser } = useAuthUser();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch {
        toast.error("Could not connect to chat");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;
    const callUrl = `${window.location.origin}/call/${channel.id}`;
    channel.sendMessage({
      text: `I've started a video call. Join me here: ${callUrl}`,
    });
    toast.success("Video call link sent!");
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    
    <div className="h-screen w-screen bg-white relative">
      
      <Chat client={chatClient}>
        <Channel channel={channel}>
          {/* HEADER */}
          <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
            <ChannelHeader />
          </div>

          {/* MESSAGE LIST */}
          <div
            className="absolute top-16 bottom-16 left-0 right-0 overflow-y-auto"
            id="messageListContainer"
          >
            <MessageList />
          </div>

          {/* INPUT */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
            <MessageInput focus />
          </div>

          {/* CALL BUTTON */}
          <div className="fixed top-0 right-6 z-50">
            <CallButton handleVideoCall={handleVideoCall} />
          </div>

          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
