import type { ComponentType } from "react";
import type { Screen } from "@/navigation/screens";

import SplashScreen from "@/pages/onboarding/SplashScreen";
import WelcomeScreen from "@/pages/onboarding/WelcomeScreen";
import PersonalizeScreen from "@/pages/onboarding/PersonalizeScreen";
import PhotoUploadScreen from "@/pages/onboarding/PhotoUploadScreen";
import AIReactionScreen from "@/pages/onboarding/AIReactionScreen";
import HomeAuthScreen from "@/pages/home/HomeAuthScreen";
import SituationScreen from "@/pages/outfit/SituationScreen";
import WardrobeSourceScreen from "@/pages/outfit/WardrobeSourceScreen";
import TemplateWardrobeScreen from "@/pages/outfit/TemplateWardrobeScreen";
import OutfitLoadingScreen from "@/pages/outfit/OutfitLoadingScreen";
import OutfitResultScreen from "@/pages/outfit/OutfitResultScreen";
import OutfitAdjustmentsScreen from "@/pages/outfit/OutfitAdjustmentsScreen";
import OutfitAlternativeScreen from "@/pages/outfit/OutfitAlternativeScreen";
import ReplaceItemScreen from "@/pages/outfit/ReplaceItemScreen";
import WardrobeFilledScreen from "@/pages/wardrobe/WardrobeFilledScreen";
import WardrobeEmptyScreen from "@/pages/wardrobe/WardrobeEmptyScreen";
import AddItemScreen from "@/pages/wardrobe/AddItemScreen";
import ItemRecognitionScreen from "@/pages/wardrobe/ItemRecognitionScreen";
import RecognitionResultScreen from "@/pages/wardrobe/RecognitionResultScreen";
import RecognitionErrorScreen from "@/pages/wardrobe/RecognitionErrorScreen";
import ItemCardScreen from "@/pages/wardrobe/ItemCardScreen";
import SavedOutfitsScreen from "@/pages/saved/SavedOutfitsScreen";
import SavedEmptyScreen from "@/pages/saved/SavedEmptyScreen";
import OutfitDetailScreen from "@/pages/saved/OutfitDetailScreen";
import SaveSuccessScreen from "@/pages/auth/SaveSuccessScreen";
import SaveGuestScreen from "@/pages/auth/SaveGuestScreen";
import RegisterScreen from "@/pages/auth/RegisterScreen";
import LoginScreen from "@/pages/auth/LoginScreen";
import ProfileScreen from "@/pages/profile/ProfileScreen";
import StylePrefsScreen from "@/pages/profile/StylePrefsScreen";
import SettingsScreen from "@/pages/profile/SettingsScreen";
import NoOutfitScreen from "@/pages/states/NoOutfitScreen";
import LoadErrorScreen from "@/pages/states/LoadErrorScreen";
import NoInternetScreen from "@/pages/states/NoInternetScreen";
import ConfirmModalScreen from "@/pages/states/ConfirmModalScreen";
import ToastDemoScreen from "@/pages/states/ToastDemoScreen";
import UIKitScreen from "@/pages/ui-kit/UIKitScreen";

// Screen id → page component. TypeScript enforces that every Screen is mapped.
export const ROUTES: Record<Screen, ComponentType> = {
  splash: SplashScreen,
  welcome: WelcomeScreen,
  personalize: PersonalizeScreen,
  "photo-upload": PhotoUploadScreen,
  "ai-reaction": AIReactionScreen,
  "home-auth": HomeAuthScreen,
  situation: SituationScreen,
  "wardrobe-source": WardrobeSourceScreen,
  "template-wardrobe": TemplateWardrobeScreen,
  "wardrobe-filled": WardrobeFilledScreen,
  "wardrobe-empty": WardrobeEmptyScreen,
  "add-item": AddItemScreen,
  "item-recognition": ItemRecognitionScreen,
  "recognition-result": RecognitionResultScreen,
  "recognition-error": RecognitionErrorScreen,
  "item-card": ItemCardScreen,
  "outfit-loading": OutfitLoadingScreen,
  "outfit-result": OutfitResultScreen,
  "outfit-adjustments": OutfitAdjustmentsScreen,
  "outfit-alternative": OutfitAlternativeScreen,
  "replace-item": ReplaceItemScreen,
  "save-success": SaveSuccessScreen,
  "save-guest": SaveGuestScreen,
  register: RegisterScreen,
  login: LoginScreen,
  "saved-outfits": SavedOutfitsScreen,
  "saved-empty": SavedEmptyScreen,
  "outfit-detail": OutfitDetailScreen,
  profile: ProfileScreen,
  "style-prefs": StylePrefsScreen,
  settings: SettingsScreen,
  "no-outfit": NoOutfitScreen,
  "load-error": LoadErrorScreen,
  "no-internet": NoInternetScreen,
  "confirm-modal": ConfirmModalScreen,
  "toast-demo": ToastDemoScreen,
  "ui-kit": UIKitScreen,
};
