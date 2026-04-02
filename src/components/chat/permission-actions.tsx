"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import type { PermissionOptionInfo } from "@/lib/types"

type PermissionActionVariant = "default" | "outline"

interface PermissionActionsProps {
  options: PermissionOptionInfo[]
  onRespond: (optionId: string) => void
}

const KIND_LABEL_KEYS: Record<string, string> = {
  allow_once: "allowOnce",
  allow_always: "allowAlways",
  reject_once: "rejectOnce",
  reject_always: "rejectAlways",
}

const KIND_VARIANTS: Record<string, PermissionActionVariant> = {
  allow_once: "default",
  allow_always: "default",
  reject_once: "outline",
  reject_always: "outline",
}

function extractDetail(name: string): string | undefined {
  const match = name.match(/`([^`]+)`/)
  return match?.[1]
}

export function PermissionActions({
  options,
  onRespond,
}: PermissionActionsProps) {
  const t = useTranslations("Folder.chat.permissionDialog.actions")

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((opt) => {
        const variant: PermissionActionVariant =
          KIND_VARIANTS[opt.kind] ??
          (opt.kind.startsWith("reject") ? "outline" : "default")
        const labelKey = KIND_LABEL_KEYS[opt.kind]
        const label = labelKey ? t(labelKey as never) : opt.name
        const detail = labelKey ? extractDetail(opt.name) : undefined

        if (detail) {
          return (
            <Button
              key={opt.option_id}
              variant={variant}
              className="h-9 max-w-full basis-full justify-start overflow-hidden text-left"
              title={opt.name}
              onClick={() => onRespond(opt.option_id)}
            >
              <span className="shrink-0">{label} ·</span>
              <code className="truncate text-[0.85em] opacity-70">
                {detail}
              </code>
            </Button>
          )
        }

        return (
          <Button
            key={opt.option_id}
            variant={variant}
            className="h-9"
            title={opt.name}
            onClick={() => onRespond(opt.option_id)}
          >
            {label}
          </Button>
        )
      })}
    </div>
  )
}
