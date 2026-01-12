export default function requireGuest(req, res, next) {
  const guestId = req.header("X-Guest-Id");
  if (!guestId) {
    return res.status(400).json({
      success: false,
      message: "Missing X-Guest-Id header",
      error: { code: "MISSING_GUEST_ID", details: [] }
    });
  }
  req.guestId = guestId;
  next();
}
