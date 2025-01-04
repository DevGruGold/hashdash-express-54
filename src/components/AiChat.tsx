import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AiChat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [openAiKey, setOpenAiKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [deepseekKey, setDeepseekKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (model: 'openai' | 'gemini' | 'deepseek') => {
    if (!message.trim()) {
      toast({
        title: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    let apiKey = '';
    let apiEndpoint = '';
    let requestBody = {};

    switch (model) {
      case 'openai':
        if (!openAiKey) {
          toast({
            title: "Please enter your OpenAI API key",
            variant: "destructive",
          });
          return;
        }
        apiKey = openAiKey;
        apiEndpoint = 'https://api.openai.com/v1/chat/completions';
        requestBody = {
          model: "gpt-4-turbo-preview",
          messages: [{ role: "user", content: message }],
        };
        break;
      case 'gemini':
        if (!geminiKey) {
          toast({
            title: "Please enter your Gemini API key",
            variant: "destructive",
          });
          return;
        }
        apiKey = geminiKey;
        apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        requestBody = {
          contents: [{ parts: [{ text: message }] }],
        };
        break;
      case 'deepseek':
        if (!deepseekKey) {
          toast({
            title: "Please enter your Deepseek API key",
            variant: "destructive",
          });
          return;
        }
        apiKey = deepseekKey;
        apiEndpoint = 'https://api.deepseek.com/v1/chat/completions';
        requestBody = {
          model: "deepseek-chat",
          messages: [{ role: "user", content: message }],
        };
        break;
    }

    setLoading(true);
    try {
      console.log(`Making request to ${model} API...`);
      const response = await fetch(`${apiEndpoint}${model === 'gemini' ? '?key=' + apiKey : ''}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(model !== 'gemini' && { 'Authorization': `Bearer ${apiKey}` }),
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(`${model} API response:`, data);

      let aiResponse = '';
      switch (model) {
        case 'openai':
          aiResponse = data.choices[0]?.message?.content;
          break;
        case 'gemini':
          aiResponse = data.candidates[0]?.content?.parts[0]?.text;
          break;
        case 'deepseek':
          aiResponse = data.choices[0]?.message?.content;
          break;
      }

      if (aiResponse) {
        setResponse(aiResponse);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(`Error with ${model} API:`, error);
      toast({
        title: `Error with ${model} API`,
        description: "Please check your API key and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white/5 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-xl text-gray-200">AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <Input
            type="password"
            placeholder="OpenAI API Key"
            value={openAiKey}
            onChange={(e) => setOpenAiKey(e.target.value)}
            className="bg-white/10 border-purple-500/20"
          />
          <Input
            type="password"
            placeholder="Gemini API Key"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            className="bg-white/10 border-purple-500/20"
          />
          <Input
            type="password"
            placeholder="Deepseek API Key"
            value={deepseekKey}
            onChange={(e) => setDeepseekKey(e.target.value)}
            className="bg-white/10 border-purple-500/20"
          />
        </div>

        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px] bg-white/10 border-purple-500/20"
        />

        <div className="flex gap-2">
          <Button
            onClick={() => handleSubmit('openai')}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Ask OpenAI
          </Button>
          <Button
            onClick={() => handleSubmit('gemini')}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            Ask Gemini
          </Button>
          <Button
            onClick={() => handleSubmit('deepseek')}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white"
          >
            Ask Deepseek
          </Button>
        </div>

        {response && (
          <Card className="mt-4 bg-white/10 border-purple-500/20">
            <CardContent className="pt-4">
              <p className="text-gray-200 whitespace-pre-wrap">{response}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};