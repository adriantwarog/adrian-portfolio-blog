"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AudioPlayer } from "@/components/audio-player"
import { Volume2, Loader2 } from "lucide-react"

interface AudioGeneratorProps {
  text: string
  title: string
}

export function AudioGenerator({ text, title }: AudioGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateAudio = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate audio')
      }

      // Get the audio blob
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)

    } catch (error) {
      console.error('Audio generation error:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate audio')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-muted/50 rounded-lg p-4 mb-8">
      <h3 className="font-semibold mb-3">Listen to this article</h3>
      
      {!audioUrl ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Generate an AI-powered audio version of this article
          </p>
          <Button 
            onClick={generateAudio} 
            disabled={isGenerating}
            className="w-full sm:w-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Audio...
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 mr-2" />
                Generate Audio
              </>
            )}
          </Button>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
      ) : (
        <AudioPlayer src={audioUrl} title={title} />
      )}
    </div>
  )
} 