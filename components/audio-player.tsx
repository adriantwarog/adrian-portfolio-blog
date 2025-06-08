"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2 } from "lucide-react"

interface AudioPlayerProps {
  src: string
  title: string
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (value[0] / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0] / 100
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="bg-background border rounded-lg p-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={togglePlayPause} className="flex-shrink-0">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <div className="flex-1 space-y-2">
          <div className="text-sm font-medium truncate">{title}</div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground min-w-[40px]">{formatTime(currentTime)}</span>
            <Slider value={[progress]} onValueChange={handleProgressChange} max={100} step={1} className="flex-1" />
            <span className="text-xs text-muted-foreground min-w-[40px]">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Volume2 className="h-4 w-4" />
          <Slider value={[volume * 100]} onValueChange={handleVolumeChange} max={100} step={1} className="w-20" />
        </div>
      </div>
    </div>
  )
}
