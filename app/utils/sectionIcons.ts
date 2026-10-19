import type { Component } from 'vue'
import { ChartColumn, FileText, Globe, HeartCrack, House, MessageCircle, Route, Search, User } from '@lucide/vue'

/** Ícone de cada seção, pelo nome usado em app/config/persona */
const ICONS: Record<string, Component> = {
  House, User, HeartCrack, ChartColumn, Route, MessageCircle, Search, Globe, FileText,
}

export function sectionIcon(name: string): Component {
  return ICONS[name] ?? FileText
}
