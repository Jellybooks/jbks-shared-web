/* Copyright 2020 Readium Foundation. All rights reserved.
 * Use of this source code is governed by a BSD-style license,
 * available in the LICENSE file present in the Github repository of the project.
 */

import { INavigator } from "./Navigator";
import { ReadingProgression } from "../r2-shared/Publication/ReadingProgression";

export type Point = {
  screenX: number;
  screenY: number;
}

/** A navigator rendering the publication visually on-screen. */
export interface IVisualNavigator extends INavigator {
  
  /** Viewport view. */
  view: any;
  
  /** Current reading progression direction. */
  readingProgression: ReadingProgression;

  /** Moves to the left content portion (eg. page) relative to the reading progression direction.
   *  - Parameter completion: Called when the transition is completed.
   *  - Returns: Whether the navigator is able to move to the previous content portion. The completion block is only called if true was returned. 
   */
  goLeft(animated: boolean, completion: () => void): boolean;

  /** Moves to the right content portion (eg. page) relative to the reading progression direction.
   *  - Parameter completion: Called when the transition is completed.
   *  - Returns: Whether the navigator is able to move to the previous content portion. The completion block is only called if true was returned.
   */
  goRight(animated: boolean, completion: () => void): boolean;

  /** Called when the user tapped the publication, and it didn't trigger any internal action.
   *  The point is relative to the navigator's view.
   */
  clicked: (atPoint: Point) => void;
}