import Publication from "../r2-shared/Publication/Publication";
import { Link } from "../r2-shared/Publication/Link";
import { Locator } from "../r2-shared/Publication/Locator";

export interface Navigator {
  publication: Publication;
  currentLocation?: Locator;

  /** Moves to the position in the publication correponding to the given `Locator`.
   *  - Parameter completion: Called when the transition is completed.
   *  - Returns: Whether the navigator is able to move to the locator. The completion block is only called if true was returned. 
   */
  goToLocator(location: Locator, animated: boolean, completion: () => void): boolean;

  /** Moves to the position in the publication targeted by the given link.
   *  - Parameter completion: Called when the transition is completed.
   *  - Returns: Whether the navigator is able to move to the locator. The completion block is only called if true was returned.
   */
  goToLink(link: Link, animated: boolean, completion: () => void): boolean;

  /** Moves to the next content portion (eg. page) in the reading progression direction.
   *  - Parameter completion: Called when the transition is completed.
   *  - Returns: Whether the navigator is able to move to the next content portion. The completion block is only called if true was returned.
   */
  goForward(animated: boolean, completion: () => void): boolean;

  /** Moves to the previous content portion (eg. page) in the reading progression direction.
   *  - Parameter completion: Called when the transition is completed.
   *  - Returns: Whether the navigator is able to move to the previous content portion. The completion block is only called if true was returned.
   */
  goBackward(animated: boolean, completion: () => void): boolean;

  /** Called when the current position in the publication changed. You should save the locator here to restore the last read page. */
  locationChanged: (location: Locator) => void;
  
  /** Called when an error must be reported to the user. */
  presentError: (error: string) => void;
  
  /** Called when the user tapped an external URL. The default implementation opens the URL with the default browser. */
  presentExternalURL: (url: string) => void;
}