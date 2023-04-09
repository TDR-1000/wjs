/*!
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { assertGetChat } from '../../assert';
import { ChatPresence, Wid } from '../../whatsapp';
import { markIsPaused } from '.';

/**
 * Mark a chat to recording state
 * and keep sending "is recording"
 *
 * @example
 * ```javascript
 * // Mark is recording
 * WPP.chat.markIsRecording('[number]@c.us');
 *
 * // Mark is recording for 5 seconds
 * WPP.chat.markIsRecording('[number]@c.us', 5000);
 * ```
 * @category Chat
 */
export async function markIsRecording(chatId: string | Wid, duration?: number) {
  const chat = assertGetChat(chatId);

  await chat.presence.subscribe();

  await ChatPresence.markRecording(chat);

  if (duration) {
    await new Promise<void>((resolve) => {
      chat.pausedTimerId = setTimeout(() => {
        markIsPaused(chatId).then(resolve, resolve);
      }, duration);
    });
  }
}
