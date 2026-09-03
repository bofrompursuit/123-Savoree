"use client";

import { useSyncExternalStore } from "react";
import SignUpGate from "./SignUpGate";
import NarwhalMascot from "./NarwhalMascot";

const STORAGE_KEY = "savoree_unlocked";
const UNLOCK_EVENT = "savoree-unlock-changed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(UNLOCK_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UNLOCK_EVENT, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

function getServerSnapshot() {
  return false;
}

export default function AppGate({ children }: { children: React.ReactNode }) {
  const unlocked = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function handleUnlock() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    window.dispatchEvent(new Event(UNLOCK_EVENT));
  }

  return (
    <>
      {unlocked ? children : <SignUpGate onUnlock={handleUnlock} />}
      <NarwhalMascot landing={!unlocked} />
    </>
  );
}
