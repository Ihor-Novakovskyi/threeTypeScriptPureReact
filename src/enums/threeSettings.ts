export const isMobile =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
export enum THREE_SETTINGS { 
    CAMERA_POSITION_Z = isMobile ? 7 : 5,
	MAX_SCALE_SHAPE = 2.5,
	DEFAULT_SCALE = 0,
}
