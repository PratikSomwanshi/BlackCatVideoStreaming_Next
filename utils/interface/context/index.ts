export interface IGlobalContext {
    isJWTExpired: boolean,
    setIsJWTExpired: (value: boolean) => void
    isUserAccountSliderOpen: boolean,
    setIsUserAccountSliderOpen: (value: boolean) => void,
}