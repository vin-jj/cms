"use client";

import { useEffect, useState } from "react";
import {
  buildDefaultSeoEntries,
  normalizeSeoEntries,
  SEO_DEFINITIONS_STORAGE_KEY,
  SEO_DEFINITIONS_STORE_EVENT,
  SEO_STORAGE_KEY,
  SEO_STORE_EVENT,
  seoPageDefinitions,
  type SeoEntry,
  type SeoPageDefinition,
} from "./data";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readStoredDefinitions() {
  if (!canUseStorage()) return [...seoPageDefinitions];

  const raw = window.localStorage.getItem(SEO_DEFINITIONS_STORAGE_KEY);
  if (!raw) return [...seoPageDefinitions];

  try {
    const parsed = JSON.parse(raw) as SeoPageDefinition[];
    if (!Array.isArray(parsed)) return [...seoPageDefinitions];
    return parsed;
  } catch {
    return [...seoPageDefinitions];
  }
}

function readStoredEntries(definitions: readonly SeoPageDefinition[] = readStoredDefinitions()) {
  if (!canUseStorage()) return buildDefaultSeoEntries(definitions);

  const raw = window.localStorage.getItem(SEO_STORAGE_KEY);
  if (!raw) return buildDefaultSeoEntries(definitions);

  try {
    const parsed = JSON.parse(raw) as Partial<SeoEntry>[];
    if (!Array.isArray(parsed)) return buildDefaultSeoEntries(definitions);
    return normalizeSeoEntries(parsed, definitions);
  } catch {
    return buildDefaultSeoEntries(definitions);
  }
}

export function getSeoEntriesSnapshot() {
  return readStoredEntries();
}

export function getSeoPageDefinitionsSnapshot() {
  return readStoredDefinitions();
}

export function persistSeoEntries(entries: SeoEntry[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SEO_STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event(SEO_STORE_EVENT));
}

export function upsertSeoEntry(entry: SeoEntry) {
  const current = readStoredEntries();
  persistSeoEntries(current.map((item) => (item.key === entry.key ? entry : item)));
}

export function resetSeoEntry(key: SeoEntry["key"]) {
  const definitions = readStoredDefinitions();
  const defaults = buildDefaultSeoEntries(definitions);
  const target = defaults.find((item) => item.key === key);

  if (!target) return;

  const current = readStoredEntries(definitions);
  persistSeoEntries(current.map((item) => (item.key === key ? target : item)));
}

export function persistSeoPageDefinitions(definitions: SeoPageDefinition[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SEO_DEFINITIONS_STORAGE_KEY, JSON.stringify(definitions));
  window.dispatchEvent(new Event(SEO_DEFINITIONS_STORE_EVENT));
}

export function useSeoPageDefinitions() {
  const [definitions, setDefinitions] = useState<SeoPageDefinition[]>([...seoPageDefinitions]);

  useEffect(() => {
    const sync = () => setDefinitions(readStoredDefinitions());
    sync();
    window.addEventListener(SEO_DEFINITIONS_STORE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SEO_DEFINITIONS_STORE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return definitions;
}

export function useSeoEntries() {
  const [entries, setEntries] = useState<SeoEntry[]>(buildDefaultSeoEntries());

  useEffect(() => {
    const sync = () => setEntries(readStoredEntries(readStoredDefinitions()));
    sync();
    window.addEventListener(SEO_STORE_EVENT, sync);
    window.addEventListener(SEO_DEFINITIONS_STORE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SEO_STORE_EVENT, sync);
      window.removeEventListener(SEO_DEFINITIONS_STORE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return entries;
}
