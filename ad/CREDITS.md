# Credits & licensing — Air Fryer Meals for Two (30s ad)

## Footage — Pexels (9 clips)
Full list with Pexels page URLs and the exact downloaded file URLs: `footage/sources.csv`.
Originals are in `footage/raw/`, pre-cut shots in `public/clips/` (rebuild with `./scripts_prep.sh`).

| Pexels ID | Used as | Page |
|---|---|---|
| 7490594 | Hook + value cut (fries) | https://www.pexels.com/video/close-up-view-of-french-fries-7490594/ |
| 4915212 | Problem (couple cooking) | https://www.pexels.com/video/food-couple-love-people-4915212/ |
| 5644998 | Problem (zucchini) | https://www.pexels.com/video/close-up-view-of-person-cutting-zucchini-with-a-knife-5644998/ |
| 4702555 | Product reveal frame | https://www.pexels.com/video/meat-sizzling-in-hot-oil-4702555/ |
| 4064770 | Value cut (chicken) | https://www.pexels.com/video/a-person-frying-a-chicken-meat-4064770/ |
| 12409708 | Value cut (salmon) | https://www.pexels.com/video/pouring-olive-oil-on-salmon-12409708/ |
| 5866266 | Value cut (vegetables) | https://www.pexels.com/video/a-plate-of-vegetables-5866266/ |
| 4974557 | Bonus (roasted cauliflower) | https://www.pexels.com/video/baked-cauliflower-4974557/ |
| 7929017 | Price/CTA frame (plating) | https://www.pexels.com/video/a-person-putting-food-on-a-plate-7929017/ |

**Pexels license (checked at https://www.pexels.com/license/ on 2026-11-12):** free to use, including commercial use,
ads and social media; editing allowed; attribution not required. Restrictions that matter for this ad:
- "Don't imply endorsement of your product by people or brands on the imagery." — the couple in clip 4915212 is shown
  only as a relatable cooking moment; do not add copy suggesting they use or recommend the cookbook.
- "Identifiable people may not appear in a bad light or in a way that is offensive."
- Don't redistribute the raw clips on other stock platforms or sell unaltered copies.
Before publishing, also review Pexels' full Terms of Service: https://www.pexels.com/terms-of-service/

## Voiceover
Generated with Higgsfield → Text to Speech V2, ElevenLabs engine, preset voice "Emily" (female).
Raw take: `public/audio/vo-raw.mp3`. Timed/edited take used in the ad: `public/audio/vo.wav`.
Usage rights follow your Higgsfield account terms (free plan at time of generation) — confirm commercial use is
permitted on your plan before running paid ads.

## Music
Generated with Higgsfield → ElevenLabs Music v2 (instrumental, 31s): `public/audio/music.mp3`.
Same note as above: confirm your plan's commercial-use terms.

## Sound effects
Whoosh, pops, dings, sizzle and click are synthesised with FFmpeg in `scripts/build_audio.py` — no third-party assets.

## Product artwork
Cookbook cover: the seller's own cover, as published on the Kiwify checkout.
