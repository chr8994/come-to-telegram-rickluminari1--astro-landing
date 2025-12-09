import ImagePicker from "@/components/ui/image-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  PROFILE_CONTEXT_MAX,
  PROFILE_DISPLAY_NAME_MAX,
  PROFILE_USERNAME_MAX,
  PROFILE_USERNAME_MIN
} from "@/db/limits"
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconLoader2
} from "@tabler/icons-react"
import { FC, useCallback, useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"
import { LimitDisplay } from "../ui/limit-display"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "../ui/select"

interface ProfileStepProps {
  profileContext: string
  profileImage: File | null
  profileImageSrc: string
  username: string
  usernameAvailable: boolean
  displayName: string
  onProfileContextChange: (profileContext: string) => void
  onProfileImageChange: (image: File) => void
  onProfileImageChangeSrc: (image: string) => void
  onUsernameAvailableChange: (isAvailable: boolean) => void
  onUsernameChange: (username: string) => void
  onDisplayNameChange: (name: string) => void
}

export const ProfileStep: FC<ProfileStepProps> = ({
  profileContext,
  profileImage,
  profileImageSrc,
  username,
  usernameAvailable,
  displayName,
  onProfileContextChange,
  onProfileImageChange,
  onProfileImageChangeSrc,
  onUsernameAvailableChange,
  onUsernameChange,
  onDisplayNameChange
}) => {
  const [loading, setLoading] = useState(false)

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null

    return (...args: any[]) => {
      const later = () => {
        if (timeout) clearTimeout(timeout)
        func(...args)
      }

      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const checkUsernameAvailability = useCallback(
    debounce(async (username: string) => {
      if (!username) return

      if (username.length < PROFILE_USERNAME_MIN) {
        onUsernameAvailableChange(false)
        return
      }

      if (username.length > PROFILE_USERNAME_MAX) {
        onUsernameAvailableChange(false)
        return
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/
      if (!usernameRegex.test(username)) {
        onUsernameAvailableChange(false)
        alert(
          "Username must be letters, numbers, or underscores only - no other characters or spacing allowed."
        )
        return
      }

      setLoading(true)

      const response = await fetch(`/api/username/available`, {
        method: "POST",
        body: JSON.stringify({ username })
      })

      const data = await response.json()
      const isAvailable = data.isAvailable

      onUsernameAvailableChange(isAvailable)

      setLoading(false)
    }, 500),
    []
  )

  return (
    <>
      {/* <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Label>Username</Label>

          <div className="text-xs">
            {usernameAvailable ? (
              <div className="text-green-500">AVAILABLE</div>
            ) : (
              <div className="text-red-500">UNAVAILABLE</div>
            )}
          </div>
        </div>

        <div className="relative">
          <Input
            className="pr-10"
            placeholder="username"
            value={username}
            onChange={e => {
              onUsernameChange(e.target.value)
              checkUsernameAvailability(e.target.value)
            }}
            minLength={PROFILE_USERNAME_MIN}
            maxLength={PROFILE_USERNAME_MAX}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {loading ? (
              <IconLoader2 className="animate-spin" />
            ) : usernameAvailable ? (
              <IconCircleCheckFilled className="text-green-500" />
            ) : (
              <IconCircleXFilled className="text-red-500" />
            )}
          </div>
        </div>

        <LimitDisplay used={username.length} limit={PROFILE_USERNAME_MAX} />
      </div> */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>First Name</Label>

          <Input
            placeholder="First Name"
            value={displayName}
            onChange={e => onDisplayNameChange(e.target.value)}
            maxLength={PROFILE_DISPLAY_NAME_MAX}
          />

          <LimitDisplay
            used={displayName.length}
            limit={PROFILE_DISPLAY_NAME_MAX}
          />
        </div>
        <div className="space-y-1">
          <Label>Last Name</Label>

          <Input
            placeholder="Last Name"
            value={displayName}
            onChange={e => onDisplayNameChange(e.target.value)}
            maxLength={PROFILE_DISPLAY_NAME_MAX}
          />

          <LimitDisplay
            used={displayName.length}
            limit={PROFILE_DISPLAY_NAME_MAX}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Job Role</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="ml--4">Sales</SelectLabel>
                <SelectItem value="sales_agent">
                  Sales Agent / Consultant
                </SelectItem>
                <SelectItem value="sales_manager">Sales Manager</SelectItem>
                <SelectItem value="sales_director">
                  Sales Director / Regional Manager
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Marketing</SelectLabel>
                <SelectItem value="marketing_coordinator">
                  Marketing Coordinator / Specialist
                </SelectItem>
                <SelectItem value="marketing_manager">
                  Marketing Manager
                </SelectItem>
                <SelectItem value="marketing_brand">
                  Brand / Creative Director
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>HR / Talent Group</SelectLabel>
                <SelectItem value="hr_generalist">
                  HR Generalist / Recruiter
                </SelectItem>
                <SelectItem value="hr_manager">
                  HR Manager / Talent Acquisition Lead
                </SelectItem>
                <SelectItem value="training">
                  Training / L&D Specialist
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Leadership / Management</SelectLabel>
                <SelectItem value="leadership_executive">
                  Executive (CEO, COO, CFO)
                </SelectItem>
                <SelectItem value="leadership_vp">
                  VP / Director of Operations
                </SelectItem>
                <SelectItem value="leadership_other">
                  Other Senior Roles
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Administrative / IT</SelectLabel>
                <SelectItem value="customer-service">
                  System Administrator
                </SelectItem>
                <SelectItem value="customer-service">
                  IT Support / Engineer
                </SelectItem>
              </SelectGroup>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Profile Image (optional)</Label>

          <ImagePicker
            src={profileImageSrc}
            image={profileImage}
            height={100}
            width={100}
            onSrcChange={onProfileImageChangeSrc}
            onImageChange={onProfileImageChange}
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label>
          What would you like the AI to know about you to provide better
          responses?
        </Label>

        <ReactTextareaAutosize
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          maxLength={PROFILE_CONTEXT_MAX}
          minRows={3}
          maxRows={10}
          placeholder="Profile context here... (optional)"
          value={profileContext}
          onChange={e => onProfileContextChange(e.target.value)}
        />

        <LimitDisplay
          used={profileContext.length}
          limit={PROFILE_CONTEXT_MAX}
        />
      </div>
    </>
  )
}
