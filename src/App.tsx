import React, { useState, useEffect } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen =
  | 'splash' | 'welcome' | 'personalize' | 'photo-upload' | 'ai-reaction'
  | 'home-auth' | 'situation' | 'wardrobe-source' | 'template-wardrobe'
  | 'wardrobe-filled' | 'wardrobe-empty' | 'add-item' | 'item-recognition'
  | 'recognition-result' | 'recognition-error' | 'item-card' | 'outfit-loading'
  | 'outfit-result' | 'outfit-adjustments' | 'outfit-alternative' | 'replace-item'
  | 'save-success' | 'save-guest' | 'register' | 'login'
  | 'saved-outfits' | 'saved-empty' | 'outfit-detail'
  | 'profile' | 'style-prefs' | 'settings'
  | 'no-outfit' | 'load-error' | 'no-internet'
  | 'confirm-modal' | 'toast-demo' | 'ui-kit'

interface Ctx {
  go: (s: Screen) => void
  back: () => void
  isAuth: boolean
  setAuth: (v: boolean) => void
  userName: string
  setUserName: (v: string) => void
  hasPhoto: boolean
  setHasPhoto: (v: boolean) => void
}

// ─── Images ───────────────────────────────────────────────────────────────────

const U = (id: string, w = 600, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`

const IMGS = {
  // Editorial / mood
  editorialBlackJacket:  U('1603189343302-e603f7add05a', 700, 900),
  editorialBlazer:       U('1613915617430-8ab0fd7c6baf', 500, 700),
  editorialBWCoat:       U('1681602642250-ee015eba94a3', 500, 800),
  editorialDarkCoat:     U('1735480222193-3fe22ffd70b6', 700, 900),
  editorialFieldDress:   U('1717764488252-71702b7acf7d', 600, 900),

  // Portraits
  portraitGray:          U('1533392151650-269f96231f65', 500, 700),
  portraitBlazer:        U('1629511565591-a1d494ad6c58', 500, 700),
  portraitBrown:         U('1677715156741-b7af71207c4d', 500, 700),

  // Clothing — tops
  itemWhiteShirt:        U('1612889002991-fbfaf775d231', 400, 520),
  itemCoat:              U('1664029593173-183fbb854642', 400, 520),
  itemBlackPeacoat:      U('1639270601211-9265bafae0f9', 400, 520),
  itemGraySuit:          U('1622114684497-a9820f5ebc41', 400, 520),
  itemBrownShirt:        U('1586689311267-e88bb0509995', 400, 520),

  // Clothing — bottoms
  itemBlackJeans:        U('1718252540511-e958742e4165', 400, 400),
  itemJeansDetail:       U('1633963643586-1a39077623be', 400, 520),

  // Shoes
  itemLoafers:           U('1616406432452-07bc5938759d', 400, 380),
  itemBrownShoes:        U('1675947258177-aa8120ddefa3', 400, 380),
  itemLeatherShoes:      U('1563434564528-8fdf5996e622', 400, 380),

  // Accessories
  itemBlackBag:          U('1758542988969-39a10168b2ce', 400, 440),
  itemBeltDetail:        U('1755214832310-074c4cc45372', 400, 400),
  itemLeatherDetail:     U('1614676471928-2ed0ad1061a4', 400, 400),

  // Wardrobe
  hangers:               U('1490481651871-ab68de25d43d', 700, 500),
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const I = {
  Home: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V21H4V9.5z"/><path d="M9 21V13h6v8"/>
    </svg>
  ),
  Hanger: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a2 2 0 100-4 2 2 0 000 4z"/><path d="M12 5v3M3 18l9-8 9 8"/><line x1="2" y1="18" x2="22" y2="18"/>
    </svg>
  ),
  Layers: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  User: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M9 6l6 6-6 6"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M15 6l-6 6 6 6"/>
    </svg>
  ),
  Plus: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Camera: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14"/><path d="M16 7l-2-4H10L8 7"/><circle cx="12" cy="14" r="3"/>
    </svg>
  ),
  Image: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20"/><circle cx="8" cy="8" r="2"/><path d="M2 16l5-5 4 4 3-3 5 5"/>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 12l6 6L20 6"/>
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
    </svg>
  ),
  Wifi: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M23 4v6h-6M1 20v-6h6"/>
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
    </svg>
  ),
  Info: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

function Caption({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5A5855', ...style }}>
      {children}
    </div>
  )
}

function StatusBar({ light }: { light?: boolean }) {
  const c = light ? '#F3F0E9' : '#F3F0E9'
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px 6px', height: 44, flexShrink: 0 }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: c, letterSpacing: '0.01em' }}>9:41</span>
      {/* Dynamic island */}
      <div style={{ position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)', width: 90, height: 24, background: '#000', borderRadius: 12 }} />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          {[3, 4, 5, 6].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, background: c, borderRadius: 1 }} />
          ))}
        </div>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M1 3.5C3.3 1.3 6 0 8 0s4.7 1.3 7 3.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M3 6.5C4.5 5 6.2 4.2 8 4.2s3.5.8 5 2.3" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="8" cy="9.5" r="1.2" fill={c}/>
        </svg>
        <div style={{ width: 26, height: 13, border: `1.5px solid ${c}`, borderRadius: 2, padding: '2px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '70%', height: '100%', background: c, borderRadius: 1 }} />
        </div>
      </div>
    </div>
  )
}

function BottomNav({ active, ctx }: { active: string; ctx: Ctx }) {
  const tabs = [
    { id: 'home', label: 'Главная', icon: <I.Home />, screen: (ctx.isAuth ? 'home-auth' : 'welcome') as Screen },
    { id: 'wardrobe', label: 'Гардероб', icon: <I.Hanger />, screen: 'wardrobe-filled' as Screen },
    { id: 'outfits', label: 'Образы', icon: <I.Layers />, screen: 'saved-outfits' as Screen },
    { id: 'profile', label: 'Профиль', icon: <I.User />, screen: 'profile' as Screen },
  ]
  return (
    <div style={{ borderTop: '1px solid #252525', background: '#0D0D0D', flexShrink: 0 }}>
      <div style={{ display: 'flex' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => ctx.go(tab.screen)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 0 4px', background: 'transparent', cursor: 'pointer', border: 'none', color: active === tab.id ? '#F3F0E9' : '#4A4845', position: 'relative' }}>
            {tab.icon}
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{tab.label}</span>
            {active === tab.id && <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#6B1F2B', position: 'absolute', bottom: 4 }} />}
          </button>
        ))}
      </div>
      <div style={{ height: 18 }} />
    </div>
  )
}

/* Gray placeholder — kept for user-uploaded photos and error states */
function Ph({ label, style, onClick }: { label: string; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: onClick ? 'pointer' : 'default', flexShrink: 0, ...style }}>
      <span style={{ color: '#3A3A38', fontSize: 10, fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', padding: '0 10px', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
        {label}
      </span>
    </div>
  )
}

/* Real Unsplash image */
function Img({ src, alt, style, onClick, overlay }: {
  src: string; alt: string; style?: React.CSSProperties; onClick?: () => void; overlay?: boolean
}) {
  return (
    <div onClick={onClick} style={{ position: 'relative', overflow: 'hidden', background: '#1A1A1A', flexShrink: 0, cursor: onClick ? 'pointer' : 'default', ...style }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {overlay && <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,13,13,0.35)' }} />}
    </div>
  )
}

function Btn({ children, onClick, variant = 'primary', full, small }: {
  children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost' | 'accent'; full?: boolean; small?: boolean
}) {
  const s: Record<string, React.CSSProperties> = {
    primary:   { background: '#F3F0E9', color: '#0D0D0D', border: 'none' },
    secondary: { background: 'transparent', color: '#F3F0E9', border: '1px solid #3A3A3A' },
    ghost:     { background: 'transparent', color: '#6A6865', border: 'none' },
    accent:    { background: '#6B1F2B', color: '#F3F0E9', border: 'none' },
  }
  return (
    <button onClick={onClick} style={{ ...s[variant], fontFamily: "'DM Sans', sans-serif", fontSize: small ? 12 : 13, fontWeight: 500, letterSpacing: '0.09em', textTransform: 'uppercase', padding: small ? '10px 20px' : '15px 24px', width: full ? '100%' : undefined, borderRadius: 1, cursor: 'pointer', display: 'inline-block', textAlign: 'center' }}>
      {children}
    </button>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button aria-label="Назад" onClick={onClick} style={{ color: '#F3F0E9', minWidth: 36, minHeight: 36, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
      <I.ChevronLeft />
    </button>
  )
}

function Divider() {
  return <div style={{ height: 1, background: '#1E1E1E', flexShrink: 0 }} />
}

function Tag({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '7px 14px', borderRadius: 1, border: '1px solid', borderColor: active ? '#F3F0E9' : '#2A2A2A', color: active ? '#F3F0E9' : '#5A5855', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
      {children}
    </button>
  )
}

function OutfitPiece({ src, alt, style, editing, removed, onReplace, onRemove }: {
  src: string; alt: string; style?: React.CSSProperties; editing?: boolean; removed?: boolean; onReplace?: () => void; onRemove?: () => void
}) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#1A1A1A', flexShrink: 0, outline: editing ? '1px solid #6B1F2B' : 'none', ...style }}>
      {removed ? (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#151313', color: '#6A6865', fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center' }}>Вещь<br />удалена</div>
      ) : (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      )}
      {editing && !removed && (
        <div style={{ position: 'absolute', top: 8, left: 8, right: 8, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <button aria-label={`Заменить: ${alt}`} onClick={onReplace} style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', color: '#F3F0E9', background: 'rgba(13,13,13,0.94)', border: '1px solid #4A4845', cursor: 'pointer' }}><I.Edit /></button>
          <button aria-label={`Удалить: ${alt}`} onClick={onRemove} style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', color: '#F3F0E9', background: '#6B1F2B', border: '1px solid #8B2D3B', cursor: 'pointer' }}><I.X /></button>
        </div>
      )}
    </div>
  )
}

// ─── Screens ─────────────────────────────────────────────────────────────────

// 1. Splash
function SplashScreen() {
  return (
    <div style={{ height: '100%', position: 'relative', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={IMGS.editorialDarkCoat} alt="fashion" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0D0D0D 0%, transparent 30%, transparent 70%, #0D0D0D 100%)' }} />
      <div style={{ position: 'relative', textAlign: 'center', animation: 'fadeIn 1s ease' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 84, fontWeight: 400, color: '#F3F0E9', letterSpacing: '-0.03em', lineHeight: 1 }}>
          Shine
        </div>
        <div style={{ width: 32, height: 1, background: '#6B1F2B', margin: '18px auto 18px' }} />
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#6A6865', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          Shine bright like a diamond
        </div>
      </div>
    </div>
  )
}

// 2. Welcome
function WelcomeScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px 24px 32px' }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 50, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.06, marginBottom: 20 }}>
            Что надеть<br /><em>сегодня?</em>
          </div>
          <div style={{ width: 20, height: 1, background: '#6B1F2B', marginBottom: 20 }} />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#6A6865', lineHeight: 1.7 }}>
            Shine подбирает образы из вашего гардероба с учётом погоды, ситуации и личного стиля.
          </div>
        </div>

        {/* Editorial image pair */}
        <div style={{ position: 'relative', height: 210, marginBottom: 28 }}>
          <Img src={IMGS.editorialBlazer} alt="fashion editorial" style={{ position: 'absolute', left: 0, top: 0, width: 152, height: 196 }} />
          <Img src={IMGS.editorialBWCoat} alt="fashion editorial" style={{ position: 'absolute', right: 0, top: 20, width: 124, height: 168 }} />
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: 36, background: '#2A2A2A' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn full onClick={() => ctx.go('personalize')}>Начать</Btn>
          <Btn full variant="ghost" onClick={() => ctx.go('situation')}>Попробовать без регистрации</Btn>
        </div>
      </div>
    </div>
  )
}

// 3. Personalize
function PersonalizeScreen({ ctx }: { ctx: Ctx }) {
  const [name, setName] = useState('')
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 28 }}>
          <button onClick={() => { ctx.setAuth(true); ctx.go('home-auth') }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', letterSpacing: '0.07em', textTransform: 'uppercase', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            Пропустить
          </button>
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.15, marginBottom: 16 }}>
          Сделаем<br /><em>Shine</em> вашим
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.7, marginBottom: 40 }}>
          Фото персонализирует ваше пространство. Это не виртуальная примерка — образы показываются как коллаж вещей.
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <button onClick={() => ctx.go('photo-upload')} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, border: '1px solid #2A2A2A', background: 'transparent', cursor: 'pointer', textAlign: 'left', borderRadius: 1 }}>
              <Ph label="Фото" style={{ width: 52, height: 52, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#F3F0E9', fontWeight: 500 }}>Добавить фото</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', marginTop: 2 }}>Оставайтесь собой в профиле</div>
              </div>
            </button>
            <div>
              <Caption>Имя</Caption>
              <input value={name} onChange={e => { setName(e.target.value); ctx.setUserName(e.target.value) }}
                placeholder="Как вас называть?"
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #2A2A2A', padding: '12px 0', fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#F3F0E9', outline: 'none', marginTop: 8 }} />
            </div>
          </div>
          <Btn full onClick={() => { ctx.setAuth(true); ctx.go('home-auth') }}>Продолжить</Btn>
        </div>
      </div>
    </div>
  )
}

// 4. Photo Upload
function PhotoUploadScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <button onClick={() => { ctx.setAuth(true); ctx.go('home-auth') }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', letterSpacing: '0.07em', textTransform: 'uppercase', background: 'transparent', border: 'none', cursor: 'pointer' }}>Пропустить</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 32px' }}>
        <Caption style={{ marginBottom: 20 }}>Шаг 1 / 2</Caption>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.2, marginBottom: 28, marginTop: 8 }}>
          Добавьте<br />ваше фото
        </div>
        <Ph label="Фото пользователя" style={{ width: '100%', flex: 1, minHeight: 260, marginBottom: 28 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={() => { ctx.setHasPhoto(true); ctx.go('ai-reaction') }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '14px 24px', border: '1px solid #F3F0E9', background: 'transparent', borderRadius: 1, color: '#F3F0E9', fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            <I.Camera /> Сделать фото
          </button>
          <button onClick={() => { ctx.setHasPhoto(true); ctx.go('ai-reaction') }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '14px 24px', border: '1px solid #2A2A2A', background: 'transparent', borderRadius: 1, color: '#6A6865', fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            <I.Image /> Из галереи
          </button>
        </div>
      </div>
    </div>
  )
}

// 5. AI Reaction
function AIReactionScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 32px' }}>
        <Ph label="Фото пользователя" style={{ width: '100%', height: 260, marginBottom: 32 }} />
        <Caption style={{ color: '#6B1F2B', marginBottom: 24 }}>Shine</Caption>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { t: 'Ваааай, что за лев этот тигр', italic: true },
            { t: 'Будем собирать образы, которые работают именно на вас', italic: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 1, background: '#6B1F2B', flexShrink: 0 }} />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: item.italic ? 'italic' : 'normal', color: '#F3F0E9', lineHeight: 1.5 }}>
                {item.t}
              </div>
            </div>
          ))}
        </div>
        <Btn full onClick={() => { ctx.setAuth(true); ctx.go('home-auth') }}>Перейти в Shine</Btn>
      </div>
    </div>
  )
}

function HomeScreen({ ctx, name }: { ctx: Ctx; name: string }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
        <section style={{ padding: '4px 24px 42px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 14, borderBottom: '1px solid #1E1E1E' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 29, fontWeight: 400, color: '#F3F0E9' }}>Shine</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#8A8680' }}>Москва · 12° · облачно</div>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8A8680', marginTop: 36, marginBottom: 5 }}>Доброе утро, {name}</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.04 }}>
            Что надеть <em>сегодня?</em>
          </div>
          <div style={{ height: 172, display: 'flex', gap: 8, marginTop: 28 }}>
            <Img src={IMGS.editorialBlackJacket} alt="fashion editorial" style={{ flex: 1.5, height: '100%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Img src={IMGS.editorialBWCoat} alt="fashion detail" style={{ flex: 1 }} />
              <div style={{ flex: 0.46, borderTop: '1px solid #6B1F2B', display: 'flex', alignItems: 'end', paddingBottom: 7 }}>
                <Caption style={{ color: '#8A8680' }}>На сегодня</Caption>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 18 }}><Btn full onClick={() => ctx.go('situation')}>Подобрать образ</Btn></div>
        </section>

        <Divider />

        <section style={{ padding: '18px 24px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#F3F0E9' }}>Мои образы</div>
            <button onClick={() => ctx.go('saved-outfits')} style={{ display: 'flex', alignItems: 'center', gap: 2, padding: 4, background: 'transparent', border: 'none', color: '#8A8680', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Все <I.ChevronRight /></button>
          </div>
          <button onClick={() => ctx.go('outfit-detail')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 0, background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
            <Img src={IMGS.editorialBlazer} alt="Дождливый вторник" style={{ width: 78, height: 94 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#F3F0E9', marginBottom: 4 }}>Дождливый вторник</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#8A8680' }}>Учёба · 12° · сегодня</div>
            </div>
            <div style={{ color: '#8A8680' }}><I.ChevronRight /></div>
          </button>
        </section>

      </div>
      <BottomNav active="home" ctx={ctx} />
    </div>
  )
}

// 6. Home
function HomeAuthScreen({ ctx }: { ctx: Ctx }) {
  return <HomeScreen ctx={ctx} name={ctx.userName || 'Алина'} />
}

// 7. Situation
function SituationScreen({ ctx }: { ctx: Ctx }) {
  const [selected, setSelected] = useState<string | null>(null)
  const sits = [
    { id: 'work', l: 'Работа', s: 'Деловая встреча, офис' },
    { id: 'study', l: 'Учёба', s: 'Университет, занятия' },
    { id: 'date', l: 'Свидание', s: 'Вечер, особый повод' },
    { id: 'sport', l: 'Спорт', s: 'Тренировка, активность' },
    { id: 'casual', l: 'Повседневный', s: 'Прогулка, встреча с друзьями' },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px' }}><BackBtn onClick={() => ctx.back()} /></div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 0' }} className="scrollbar-hide">
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.1, marginBottom: 8 }}>Куда<br />собираетесь?</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6A6865', marginBottom: 28 }}>Выберите ситуацию для образа</div>
        {sits.map((s, i) => (
          <button key={s.id} onClick={() => setSelected(s.id)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: `${i === 0 ? 20 : 16}px 12px`, border: 'none', borderBottom: '1px solid #1E1E1E', borderLeft: selected === s.id ? '2px solid #6B1F2B' : '2px solid transparent', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: i === 0 ? 34 : i < 3 ? 26 : 22, fontWeight: 400, color: '#F3F0E9' }}>{s.l}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#5A5855', marginTop: 3 }}>{s.s}</div>
            </div>
            <div aria-hidden="true" style={{ width: 18, height: 18, border: `1px solid ${selected === s.id ? '#F3F0E9' : '#4A4845'}`, borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              {selected === s.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6B1F2B' }} />}
            </div>
          </button>
        ))}
      </div>
      {selected && <div style={{ padding: '16px 24px 24px' }}><Btn full onClick={() => ctx.go('wardrobe-source')}>Образ — {sits.find(s => s.id === selected)?.l}</Btn></div>}
    </div>
  )
}

// 9. Wardrobe Source
function WardrobeSourceScreen({ ctx }: { ctx: Ctx }) {
  const [selected, setSelected] = useState<string | null>(null)
  const sources = [
    { id: 'mine', l: 'Мои вещи', s: 'Добавить свои вещи и начать', sc: 'wardrobe-filled' as Screen },
    { id: 'sample', l: 'Пример гардероба', s: 'Попробовать на готовом наборе', sc: 'template-wardrobe' as Screen },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px' }}><BackBtn onClick={() => ctx.back()} /></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 40px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.15, marginBottom: 12, marginTop: 8 }}>
          Из чего<br />соберём образ?
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.7, marginBottom: 48 }}>
          Попробовать Shine можно без регистрации и заполнения гардероба.
        </div>
        <div style={{ flex: 1 }}>
          {sources.map(item => (
            <button key={item.id} onClick={() => setSelected(item.id)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderTop: '1px solid #1E1E1E', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#F3F0E9', marginBottom: 4 }}>{item.l}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855' }}>{item.s}</div>
              </div>
              <div aria-hidden="true" style={{ width: 18, height: 18, border: `1px solid ${selected === item.id ? '#F3F0E9' : '#4A4845'}`, borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                {selected === item.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6B1F2B' }} />}
              </div>
            </button>
          ))}
          <div style={{ height: 1, background: '#1E1E1E' }} />
        </div>
      </div>
      {selected && <div style={{ padding: '16px 24px 24px' }}><Btn full onClick={() => ctx.go(sources.find(source => source.id === selected)!.sc)}>Продолжить — {sources.find(source => source.id === selected)?.l}</Btn></div>}
    </div>
  )
}

// 10. Template Wardrobe
function TemplateWardrobeScreen({ ctx }: { ctx: Ctx }) {
  const items = [
    { l: 'Верх', s: 'Белая рубашка', img: IMGS.itemWhiteShirt, span: true },
    { l: 'Низ', s: 'Прямые джинсы', img: IMGS.itemBlackJeans, span: false },
    { l: 'Верхняя одежда', s: 'Бежевый тренч', img: IMGS.itemCoat, span: false },
    { l: 'Обувь', s: 'Лоферы', img: IMGS.itemLoafers, span: false },
    { l: 'Аксессуар', s: 'Кожаная сумка', img: IMGS.itemBlackBag, span: false },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Пример</Caption>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 0' }} className="scrollbar-hide">
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#F3F0E9', marginBottom: 4, marginTop: 8 }}>Базовый гардероб</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6A6865', marginBottom: 24 }}>5 вещей для любой ситуации</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {items.map((item, i) => (
            <div key={i} style={{ gridColumn: item.span ? 'span 2' : undefined }}>
              <Img src={item.img} alt={item.s} style={{ width: '100%', height: item.span ? 180 : 140 }} />
              <div style={{ paddingTop: 8 }}>
                <Caption>{item.l}</Caption>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#F3F0E9', marginTop: 2 }}>{item.s}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
      <div style={{ padding: '16px 24px 28px' }}>
        <Btn full onClick={() => ctx.go('outfit-loading')}>Подобрать образ из этих вещей</Btn>
      </div>
    </div>
  )
}

// 11. Wardrobe Filled
function WardrobeFilledScreen({ ctx }: { ctx: Ctx }) {
  const [cat, setCat] = useState('Все')
  const cats = ['Все', 'Верх', 'Низ', 'Платья', 'Верхняя одежда', 'Обувь', 'Аксессуары']
  const things = [
    { n: 'Белая рубашка', img: IMGS.itemWhiteShirt },
    { n: 'Прямые джинсы', img: IMGS.itemBlackJeans },
    { n: 'Бежевый тренч', img: IMGS.itemCoat },
    { n: 'Лоферы', img: IMGS.itemLoafers },
    { n: 'Кожаная сумка', img: IMGS.itemBlackBag },
    { n: 'Чёрный жакет', img: IMGS.itemBlackPeacoat },
    { n: 'Серый жакет', img: IMGS.itemGraySuit },
    { n: 'Коричневые туфли', img: IMGS.itemBrownShoes },
    { n: 'Шёлковый шарф', img: IMGS.itemBeltDetail },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 24px 8px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: '#F3F0E9' }}>Гардероб</div>
        <button onClick={() => ctx.go('add-item')} style={{ color: '#F3F0E9', background: 'transparent', border: 'none', cursor: 'pointer' }}><I.Plus /></button>
      </div>
      <div style={{ overflowX: 'auto', padding: '0 24px 12px' }} className="scrollbar-hide">
        <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
          {cats.map(c => <Tag key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Tag>)}
        </div>
      </div>
      <Divider />
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }} className="scrollbar-hide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {things.map((t, i) => (
            <button key={i} aria-label={`Открыть: ${t.n}`} onClick={() => ctx.go('item-card')} style={{ padding: 0, background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
              <Img src={t.img} alt={t.n} style={{ width: '100%', aspectRatio: '3/4' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#8A8680', marginTop: 6, paddingLeft: 2 }}>{t.n}<span style={{ color: '#5A5855' }}><I.ChevronRight /></span></div>
            </button>
          ))}
        </div>
        <div style={{ height: 16 }} />
      </div>
      <BottomNav active="wardrobe" ctx={ctx} />
    </div>
  )
}

// 12. Wardrobe Empty
function WardrobeEmptyScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px 12px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: '#F3F0E9' }}>Гардероб</div>
      </div>
      <Divider />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px', textAlign: 'center' }}>
        <div style={{ width: 1, height: 56, background: '#252525', marginBottom: 32 }} />
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.3, marginBottom: 16 }}>Здесь пока пусто</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.75, marginBottom: 40 }}>
          Добавьте первые вещи — Shine начнёт собирать образы из вашего гардероба
        </div>
        <Btn onClick={() => ctx.go('add-item')}>Добавить вещь</Btn>
      </div>
      <BottomNav active="wardrobe" ctx={ctx} />
    </div>
  )
}

// 13. Add Item
function AddItemScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px' }}><BackBtn onClick={() => ctx.back()} /></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 40px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.15, marginBottom: 8, marginTop: 8 }}>Добавить вещь</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', marginBottom: 48 }}>Shine распознает характеристики автоматически</div>
        <div style={{ flex: 1 }}>
          {[
            { icon: <I.Camera />, l: 'Сделать фото', s: 'Откроется камера' },
            { icon: <I.Image />, l: 'Выбрать из галереи', s: 'Загрузить фото вещи' },
          ].map((item, i) => (
            <button key={i} onClick={() => ctx.go('item-recognition')}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 20, padding: '22px 0', borderTop: '1px solid #1E1E1E', background: 'transparent', cursor: 'pointer', textAlign: 'left', color: '#F3F0E9' }}>
              {item.icon}
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500 }}>{item.l}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', marginTop: 2 }}>{item.s}</div>
              </div>
            </button>
          ))}
          <Divider />
        </div>
      </div>
    </div>
  )
}

// 14. Item Recognition Loading
function ItemRecognitionScreen({ ctx }: { ctx: Ctx }) {
  const [dots, setDots] = useState(1)
  useEffect(() => {
    const t = setInterval(() => setDots(d => d >= 3 ? 1 : d + 1), 600)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px' }}><BackBtn onClick={() => ctx.back()} /></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 40px' }}>
        <Img src={IMGS.itemWhiteShirt} alt="clothing item" style={{ width: '100%', flex: 1, marginBottom: 32 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 6, height: 6, background: i < dots ? '#F3F0E9' : '#252525', transition: 'background 0.3s' }} />
            ))}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#8A8680' }}>Определяем характеристики вещи</div>
        </div>
        <div style={{ marginTop: 32 }}>
          <Btn small onClick={() => ctx.go('recognition-result')}>Показать результат</Btn>
        </div>
      </div>
    </div>
  )
}

// 15. Recognition Result
function RecognitionResultScreen({ ctx }: { ctx: Ctx }) {
  const attrs = [
    { k: 'Категория', v: 'Верх' }, { k: 'Тип', v: 'Рубашка' },
    { k: 'Цвет', v: 'Белый' }, { k: 'Стиль', v: 'Классический' }, { k: 'Сезон', v: 'Демисезон' },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Результат</Caption>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
        <Img src={IMGS.itemWhiteShirt} alt="white shirt" style={{ width: '100%', height: 260 }} />
        <div style={{ padding: '20px 24px' }}>
          <Caption style={{ marginBottom: 16 }}>Характеристики · Нажмите для редактирования</Caption>
          {attrs.map((a, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#5A5855' }}>{a.k}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#F3F0E9' }}>{a.v}</div>
                  <div style={{ color: '#3D3D3B' }}><I.Edit /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div style={{ padding: '16px 24px 28px' }}>
        <Btn full onClick={() => ctx.go('wardrobe-filled')}>Добавить в гардероб</Btn>
      </div>
    </div>
  )
}

// 16. Recognition Error
function RecognitionErrorScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px' }}><BackBtn onClick={() => ctx.back()} /></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 40px' }}>
        <Ph label="Фото вещи" style={{ width: '100%', height: 240, marginBottom: 32, marginTop: 8 }} />
        <div style={{ width: 1, height: 32, background: '#6B1F2B', marginBottom: 24 }} />
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.3, marginBottom: 12 }}>
          Не удалось рассмотреть вещь
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.7, marginBottom: 40 }}>
          Попробуйте сфотографировать вещь на светлом фоне, целиком.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn full onClick={() => ctx.go('item-recognition')}>Сделать другое фото</Btn>
          <Btn full variant="secondary" onClick={() => ctx.go('item-recognition')}>Выбрать другое из галереи</Btn>
        </div>
      </div>
    </div>
  )
}

// 17. Item Card
function ItemCardScreen({ ctx }: { ctx: Ctx }) {
  const attrs = [
    { k: 'Категория', v: 'Верх' }, { k: 'Тип', v: 'Жакет' },
    { k: 'Цвет', v: 'Чёрный' }, { k: 'Стиль', v: 'Классический' }, { k: 'Сезон', v: 'Демисезон' },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <div style={{ display: 'flex', gap: 20 }}>
          <button style={{ color: '#6A6865', background: 'transparent', border: 'none', cursor: 'pointer' }}><I.Edit /></button>
          <button style={{ color: '#6B1F2B', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => ctx.go('confirm-modal')}><I.Trash /></button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
        <Img src={IMGS.itemBlackPeacoat} alt="black jacket" style={{ width: '100%', height: 300 }} />
        <div style={{ padding: '20px 24px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: '#F3F0E9', marginBottom: 20 }}>Чёрный жакет</div>
          {attrs.map((a, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 0' }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#5A5855' }}>{a.k}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#F3F0E9' }}>{a.v}</div>
              </div>
            </div>
          ))}
          <Divider />
          <div style={{ paddingTop: 20 }}>
            <Caption style={{ marginBottom: 12 }}>Используется в образах</Caption>
            {['Офисный день', 'Деловая встреча'].map((n, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #1E1E1E' }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#F3F0E9' }}>{n}</div>
                <div style={{ color: '#3D3D3B' }}><I.ChevronRight /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 18. Outfit Loading
function OutfitLoadingScreen({ ctx }: { ctx: Ctx }) {
  const [step, setStep] = useState(0)
  const steps = ['Собираем образ для учёбы', 'Учитываем +14°, дождь', 'Подбираем из вашего гардероба']
  useEffect(() => {
    const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 1300)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0D0D0D', padding: '0 40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
        <div style={{ width: 60, height: 1, background: '#252525', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: '#F3F0E9', animation: 'slideLoader 1.5s ease-in-out infinite' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontStyle: 'italic', color: '#F3F0E9', lineHeight: 1.4, marginBottom: 8 }}>
            {steps[step]}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', letterSpacing: '0.05em' }}>
            Учитываем погоду и предпочтения
          </div>
        </div>
        <Btn small onClick={() => ctx.go('outfit-result')}>Показать результат</Btn>
      </div>
    </div>
  )
}

// 19. Outfit Result — editorial collage with real images
function OutfitResultScreen({ ctx }: { ctx: Ctx }) {
  const [editing, setEditing] = useState(false)
  const [removed, setRemoved] = useState<string[]>([])
  const changeVariants = [
    { label: 'Другой стиль', sub: 'Сменить направление', image: IMGS.itemGraySuit },
    { label: 'Хочу теплее', sub: 'Добавить слои', image: IMGS.itemBlackPeacoat },
    { label: 'Хочу легче', sub: 'Убрать лишнее', image: IMGS.itemWhiteShirt },
    { label: 'Более базовый', sub: 'Минимализм', image: IMGS.itemJeansDetail },
    { label: 'Выразительнее', sub: 'Акцент на детали', image: IMGS.itemBeltDetail },
  ]
  const isRemoved = (piece: string) => removed.includes(piece)
  const removePiece = (piece: string) => setRemoved(current => [...current, piece])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <Caption>{editing ? 'Редактирование образа' : 'Образ'}</Caption>
        <div style={{ width: 36, height: 36 }} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
        {editing && <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#241216', borderTop: '1px solid #6B1F2B', borderBottom: '1px solid #6B1F2B' }}><div style={{ width: 5, height: 5, background: '#8B2D3B' }} /><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#F3F0E9', letterSpacing: '0.04em' }}>Режим редактирования · заменить или удалить вещь</div></div>}
        <div style={{ padding: '8px 16px 12px' }}>
          <div style={{ display: 'flex', gap: 8, height: 220 }}>
            <OutfitPiece src={IMGS.itemCoat} alt="Бежевый тренч" style={{ flex: 1.3, height: '100%' }} editing={editing} removed={isRemoved('coat')} onReplace={() => ctx.go('replace-item')} onRemove={() => removePiece('coat')} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <OutfitPiece src={IMGS.itemWhiteShirt} alt="Белая рубашка" style={{ flex: 1 }} editing={editing} removed={isRemoved('shirt')} onReplace={() => ctx.go('replace-item')} onRemove={() => removePiece('shirt')} />
              <OutfitPiece src={IMGS.itemBlackJeans} alt="Прямые джинсы" style={{ flex: 1 }} editing={editing} removed={isRemoved('jeans')} onReplace={() => ctx.go('replace-item')} onRemove={() => removePiece('jeans')} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, height: 110, marginTop: 8 }}>
            <OutfitPiece src={IMGS.itemLoafers} alt="Лоферы" style={{ flex: 1 }} editing={editing} removed={isRemoved('loafers')} onReplace={() => ctx.go('replace-item')} onRemove={() => removePiece('loafers')} />
            <OutfitPiece src={IMGS.itemBlackBag} alt="Кожаная сумка" style={{ flex: 0.75 }} editing={editing} removed={isRemoved('bag')} onReplace={() => ctx.go('replace-item')} onRemove={() => removePiece('bag')} />
          </div>
        </div>

        <Divider />

        <div style={{ padding: '20px 24px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: '#F3F0E9', flex: 1, marginRight: 12 }}>
              Дождливый вторник
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#5A5855' }}>Учёба</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#5A5855' }}>+14°</div>
            </div>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8A8680', lineHeight: 1.65, marginBottom: 24 }}>
            Практичный образ под дождь — тренч защитит от погоды, а базовые вещи дадут свободу движений.
          </div>
          {editing && (
            <div style={{ marginBottom: 24 }}>
              <Caption style={{ marginBottom: 12 }}>Варианты образа</Caption>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="scrollbar-hide">
                {changeVariants.map(variant => (
                  <button key={variant.label} onClick={() => ctx.go('outfit-alternative')} style={{ width: 112, flexShrink: 0, padding: 0, background: '#121212', border: '1px solid #2A2A2A', textAlign: 'left', cursor: 'pointer' }}>
                    <Img src={variant.image} alt={variant.label} style={{ width: '100%', height: 78 }} />
                    <div style={{ padding: '8px 8px 9px' }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#F3F0E9', lineHeight: 1.25 }}>{variant.label}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: '#6A6865', lineHeight: 1.3, marginTop: 3 }}>{variant.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn full onClick={() => ctx.isAuth ? ctx.go('save-success') : ctx.go('save-guest')}>Сохранить образ</Btn>
            {editing ? <Btn full variant="secondary" onClick={() => setEditing(false)}>Готово</Btn> : <><Btn full variant="secondary" onClick={() => setEditing(true)}>Изменить</Btn><Btn full variant="ghost" onClick={() => ctx.go('outfit-alternative')}>Другой вариант</Btn></>}
          </div>
        </div>
      </div>
    </div>
  )
}

// 20. Outfit Adjustments
function OutfitAdjustmentsScreen({ ctx }: { ctx: Ctx }) {
  const opts = [
    { l: 'Другой стиль', s: 'Сменить направление' },
    { l: 'Хочу теплее', s: 'Добавить слои' },
    { l: 'Хочу легче', s: 'Убрать лишнее' },
    { l: 'Более базовый', s: 'Минимализм' },
    { l: 'Более выразительный', s: 'Акцент на детали' },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Корректировка</Caption>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 0' }} className="scrollbar-hide">
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.15, marginBottom: 32, marginTop: 8 }}>
          Как изменить<br />образ?
        </div>
        {opts.map((o, i) => (
          <button key={i} onClick={() => ctx.go('outfit-alternative')}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #1E1E1E', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#F3F0E9', fontWeight: 500 }}>{o.l}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', marginTop: 3 }}>{o.s}</div>
            </div>
            <div style={{ color: '#3D3D3B' }}><I.ChevronRight /></div>
          </button>
        ))}
      </div>
    </div>
  )
}

// 21. Alternative Outfit
function OutfitAlternativeScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Вариант 2</Caption>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
        <div style={{ padding: '8px 16px 0' }}>
          <div style={{ height: 220, display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Img src={IMGS.itemGraySuit} alt="gray suit" style={{ flex: 1.4 }} />
              <Img src={IMGS.itemJeansDetail} alt="jeans" style={{ flex: 1 }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Img src={IMGS.itemBeltDetail} alt="accessory" style={{ flex: 0.8 }} />
              <Img src={IMGS.itemLeatherShoes} alt="leather shoes" style={{ flex: 1.2 }} />
            </div>
          </div>
        </div>

        <div style={{ padding: '10px 24px', background: '#141414', borderTop: '1px solid #1E1E1E', borderBottom: '1px solid #1E1E1E', margin: '12px 0' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#6B1F2B', letterSpacing: '0.04em' }}>
            ● Рекомендации обновлены — теплее и базовее
          </div>
        </div>

        <div style={{ padding: '8px 24px 32px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: '#F3F0E9', marginBottom: 8 }}>Тёплый минимализм</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8A8680', lineHeight: 1.65, marginBottom: 24 }}>
            Серый жакет вместо рубашки — образ стал строже, но не потерял линию.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn full onClick={() => ctx.isAuth ? ctx.go('save-success') : ctx.go('save-guest')}>Сохранить образ</Btn>
            <Btn full variant="secondary" onClick={() => ctx.go('outfit-adjustments')}>Изменить ещё</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}

// 22. Replace Item
function ReplaceItemScreen({ ctx }: { ctx: Ctx }) {
  const alts = [
    { n: 'Чёрный жакет', img: IMGS.itemBlackPeacoat },
    { n: 'Серый жакет', img: IMGS.itemGraySuit },
    { n: 'Коричневая рубашка', img: IMGS.itemBrownShirt },
    { n: 'Бежевый тренч', img: IMGS.itemCoat },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Замена вещи</Caption>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 0' }} className="scrollbar-hide">
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6A6865', marginBottom: 20 }}>
          Выберите замену для <span style={{ color: '#F3F0E9' }}>Белой рубашки</span> — применим её сразу
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #1E1E1E' }}>
          <Img src={IMGS.itemWhiteShirt} alt="white shirt" style={{ width: 80, height: 100 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#5A5855', marginBottom: 4 }}>Текущая вещь</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#F3F0E9' }}>Белая рубашка</div>
          </div>
        </div>
        <Caption style={{ marginBottom: 16 }}>Альтернативы из гардероба</Caption>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, paddingBottom: 24 }}>
          {alts.map((a, i) => (
            <button key={i} onClick={() => ctx.go('outfit-result')} style={{ padding: 0, background: '#121212', border: '1px solid #2A2A2A', textAlign: 'left', cursor: 'pointer' }}>
              <Img src={a.img} alt={a.n} style={{ width: '100%', height: 130 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, padding: '9px 8px', fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#F3F0E9' }}><span>{a.n}</span><span style={{ color: '#8A8680' }}><I.ChevronRight /></span></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// 23. Save Success
function SaveSuccessScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D', position: 'relative' }}>
      {/* Background fashion image with overlay */}
      <img src={IMGS.editorialFieldDress} alt="fashion" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ width: 1, height: 56, background: '#6B1F2B', margin: '0 auto 32px' }} />
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: '#F3F0E9', marginBottom: 12 }}>
          Образ сохранён
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.7, marginBottom: 48 }}>
          Дождливый вторник добавлен в вашу коллекцию
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <Btn full onClick={() => ctx.go('saved-outfits')}>Перейти к образам</Btn>
          <Btn full variant="secondary" onClick={() => ctx.go(ctx.isAuth ? 'home-auth' : 'welcome')}>На главную</Btn>
        </div>
      </div>
    </div>
  )
}

// 24. Save Guest
function SaveGuestScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px' }}><BackBtn onClick={() => ctx.back()} /></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 40px' }}>
        <div style={{ display: 'flex', gap: 8, height: 140, marginBottom: 28, marginTop: 8 }}>
          <Img src={IMGS.editorialBlazer} alt="outfit preview" style={{ flex: 1.3, height: '100%' }} />
          <Img src={IMGS.itemCoat} alt="outfit piece" style={{ flex: 0.7, height: '100%' }} />
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.15, marginBottom: 12 }}>
          Сохрани образ и свой гардероб
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.75, marginBottom: 40 }}>
          Создайте аккаунт — и образы будут всегда под рукой.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn full onClick={() => { ctx.setAuth(true); ctx.go('register') }}>Зарегистрироваться</Btn>
          <Btn full variant="secondary" onClick={() => { ctx.setAuth(true); ctx.go('login') }}>Войти</Btn>
          <Btn full variant="ghost" onClick={() => ctx.back()}>Вернуться к образу</Btn>
        </div>
      </div>
    </div>
  )
}

// 25. Register
function RegisterScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <button onClick={() => ctx.go('login')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', letterSpacing: '0.06em', background: 'transparent', border: 'none', cursor: 'pointer' }}>Войти</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 24px 40px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, color: '#F3F0E9', marginBottom: 40, marginTop: 8 }}>Регистрация</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          {[{ l: 'Имя', p: 'Ваше имя', t: 'text' }, { l: 'Email', p: 'email@example.com', t: 'email' }, { l: 'Пароль', p: '••••••••', t: 'password' }].map(f => (
            <div key={f.l}>
              <Caption style={{ marginBottom: 8 }}>{f.l}</Caption>
              <input type={f.t} placeholder={f.p} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #2A2A2A', padding: '12px 0', fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#F3F0E9', outline: 'none' }} />
            </div>
          ))}
          <Btn full onClick={() => { ctx.setAuth(true); ctx.go('save-success') }}>Создать аккаунт</Btn>
        </div>
      </div>
    </div>
  )
}

// 26. Login
function LoginScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <button onClick={() => ctx.go('register')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', letterSpacing: '0.06em', background: 'transparent', border: 'none', cursor: 'pointer' }}>Регистрация</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 24px 40px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, color: '#F3F0E9', marginBottom: 40, marginTop: 8 }}>Вход</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          {[{ l: 'Email', p: 'email@example.com', t: 'email' }, { l: 'Пароль', p: '••••••••', t: 'password' }].map(f => (
            <div key={f.l}>
              <Caption style={{ marginBottom: 8 }}>{f.l}</Caption>
              <input type={f.t} placeholder={f.p} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #2A2A2A', padding: '12px 0', fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#F3F0E9', outline: 'none' }} />
            </div>
          ))}
          <div>
            <Btn full onClick={() => { ctx.setAuth(true); ctx.go('save-success') }}>Войти</Btn>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#5A5855', background: 'transparent', border: 'none', cursor: 'pointer' }}>Забыли пароль?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 27. Saved Outfits
function SavedOutfitsScreen({ ctx }: { ctx: Ctx }) {
  const outfits = [
    { n: 'Дождливый вторник', s: 'Учёба', d: '10 сентября', img: IMGS.editorialBlazer, big: true },
    { n: 'Офисный день', s: 'Работа', d: '8 сентября', img: IMGS.editorialBlackJacket, big: false },
    { n: 'Вечерняя прогулка', s: 'Повседневный', d: '5 сентября', img: IMGS.editorialFieldDress, big: false },
    { n: 'Тёплый минимализм', s: 'Учёба', d: '1 сентября', img: IMGS.editorialBWCoat, big: false },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px 12px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: '#F3F0E9' }}>Образы</div>
      </div>
      <Divider />
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }} className="scrollbar-hide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {outfits.map((o, i) => (
            <button key={i} aria-label={`Открыть образ: ${o.n}`} onClick={() => ctx.go('outfit-detail')}
              style={{ gridColumn: o.big ? 'span 2' : undefined, padding: 0, background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
              <Img src={o.img} alt={o.n} style={{ width: '100%', height: o.big ? 220 : 175 }} />
              <div style={{ paddingTop: 10, paddingBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, fontFamily: "'Playfair Display', serif", fontSize: o.big ? 20 : 16, color: '#F3F0E9', marginBottom: 4 }}><span>{o.n}</span><span style={{ color: '#8A8680' }}><I.ChevronRight /></span></div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#5A5855' }}>{o.s} · {o.d}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 8 }} />
      </div>
      <BottomNav active="outfits" ctx={ctx} />
    </div>
  )
}

// 28. Saved Empty
function SavedEmptyScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px 12px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: '#F3F0E9' }}>Образы</div>
      </div>
      <Divider />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px', textAlign: 'center' }}>
        <div style={{ width: 28, height: 1, background: '#252525', marginBottom: 32 }} />
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.3, marginBottom: 16 }}>
          Пока нет<br />сохранённых образов
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.75, marginBottom: 40 }}>
          Подберите первый образ — Shine сохранит его в вашу коллекцию
        </div>
        <Btn onClick={() => ctx.go('situation')}>Подобрать первый образ</Btn>
      </div>
      <BottomNav active="outfits" ctx={ctx} />
    </div>
  )
}

// 29. Outfit Detail
function OutfitDetailScreen({ ctx }: { ctx: Ctx }) {
  const pieces = [
    { n: 'Бежевый тренч', img: IMGS.itemCoat },
    { n: 'Белая рубашка', img: IMGS.itemWhiteShirt },
    { n: 'Прямые джинсы', img: IMGS.itemBlackJeans },
    { n: 'Лоферы', img: IMGS.itemLoafers },
    { n: 'Кожаная сумка', img: IMGS.itemBlackBag },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <button onClick={() => ctx.go('confirm-modal')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#6B1F2B', letterSpacing: '0.07em', textTransform: 'uppercase', background: 'transparent', border: 'none', cursor: 'pointer' }}>Удалить</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
        {/* Collage */}
        <div style={{ padding: '8px 16px 12px' }}>
          <div style={{ display: 'flex', gap: 8, height: 220 }}>
            <Img src={IMGS.itemCoat} alt="coat" style={{ flex: 1.2, height: '100%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Img src={IMGS.itemWhiteShirt} alt="shirt" style={{ flex: 1 }} />
              <Img src={IMGS.itemBlackJeans} alt="jeans" style={{ flex: 1 }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, height: 100, marginTop: 8 }}>
            <Img src={IMGS.itemLoafers} alt="loafers" style={{ flex: 1 }} />
            <Img src={IMGS.itemBlackBag} alt="bag" style={{ flex: 0.8 }} />
          </div>
        </div>
        <Divider />
        <div style={{ padding: '20px 24px 32px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: '#F3F0E9', marginBottom: 8 }}>Дождливый вторник</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#5A5855', marginBottom: 24 }}>Учёба · +14° · 10 сентября</div>
          <Divider />
          <div style={{ paddingTop: 20 }}>
            <Caption style={{ marginBottom: 14 }}>Вещи</Caption>
            {pieces.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #1E1E1E' }}>
                <Img src={p.img} alt={p.n} style={{ width: 40, height: 50 }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#F3F0E9' }}>{p.n}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Btn full onClick={() => ctx.go('outfit-loading')}>Повторить образ</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}

// 30. Profile
function ProfileScreen({ ctx }: { ctx: Ctx }) {
  const name = ctx.userName || 'Алина'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
        {/* Large editorial portrait */}
        <div style={{ position: 'relative' }}>
          <Img src={IMGS.portraitBlazer} alt="user portrait" style={{ width: '100%', height: 300 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, #0D0D0D 20%, transparent)', padding: '60px 24px 16px' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, color: '#F3F0E9' }}>{name}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#8A8680', marginTop: 4 }}>Минимализм · Кэжуал · Работа</div>
          </div>
        </div>

        <div style={{ padding: '0 24px' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #1E1E1E', marginBottom: 8 }}>
            {[{ n: '24', l: 'Вещей' }, { n: '8', l: 'Образов' }, { n: '3', l: 'Стиля' }].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: '20px 0', textAlign: 'center', borderRight: i < 2 ? '1px solid #1E1E1E' : 'none' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 400, color: '#F3F0E9' }}>{s.n}</div>
                <Caption style={{ marginTop: 4 }}>{s.l}</Caption>
              </div>
            ))}
          </div>
          {[
            { l: 'Предпочтения стиля', sc: 'style-prefs' as Screen },
            { l: 'Настройки', sc: 'settings' as Screen },
          ].map(item => (
            <button key={item.l} onClick={() => ctx.go(item.sc)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #1E1E1E', background: 'transparent', cursor: 'pointer' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#F3F0E9' }}>{item.l}</div>
              <div style={{ color: '#3D3D3B' }}><I.ChevronRight /></div>
            </button>
          ))}
          <div style={{ height: 8 }} />
        </div>
      </div>
      <BottomNav active="profile" ctx={ctx} />
    </div>
  )
}

// 31. Style Prefs
function StylePrefsScreen({ ctx }: { ctx: Ctx }) {
  const [sel, setSel] = useState<string[]>(['Минимализм', 'Кэжуал'])
  const styles = ['Минимализм', 'Классика', 'Кэжуал', 'Деловой', 'Спортивный', 'Уличный стиль', 'Романтический', 'Авангард']
  const moodImgs: Record<string, string> = {
    'Минимализм': IMGS.editorialBlackJacket,
    'Классика': IMGS.editorialBlazer,
    'Кэжуал': IMGS.itemBlackJeans,
    'Деловой': IMGS.itemGraySuit,
    'Спортивный': IMGS.itemJeansDetail,
    'Уличный стиль': IMGS.editorialBWCoat,
    'Романтический': IMGS.editorialFieldDress,
    'Авангард': IMGS.editorialDarkCoat,
  }
  const toggle = (s: string) => setSel(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px' }}><BackBtn onClick={() => ctx.back()} /></div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 0' }} className="scrollbar-hide">
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.15, marginBottom: 8, marginTop: 8 }}>Ваш стиль</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6A6865', lineHeight: 1.7, marginBottom: 28 }}>
          Выберите направления — Shine учтёт их при подборе образов
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {styles.map(s => <Tag key={s} active={sel.includes(s)} onClick={() => toggle(s)}>{s}</Tag>)}
        </div>
        <Caption style={{ marginBottom: 16 }}>Вдохновение</Caption>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          {sel.slice(0, 4).map((s, i) => (
            <div key={i}>
              <Img src={moodImgs[s] || IMGS.editorialBlazer} alt={s} style={{ width: '100%', height: 120 }} />
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#5A5855', marginTop: 6 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '16px 24px 28px' }}>
        <Btn full onClick={() => ctx.go('profile')}>Сохранить</Btn>
      </div>
    </div>
  )
}

// 32. Settings
function SettingsScreen({ ctx }: { ctx: Ctx }) {
  const items = [
    { l: 'Аккаунт', s: ctx.userName || 'Алина' },
    { l: 'Персонализация', s: 'Стиль и предпочтения' },
    { l: 'Погода / Город', s: 'Москва' },
    { l: 'Уведомления', s: 'Включены' },
    { l: 'Конфиденциальность', s: null },
    { l: 'Обратная связь', s: null },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 24px 12px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: '#F3F0E9' }}>Настройки</div>
      </div>
      <Divider />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }} className="scrollbar-hide">
        {items.map((item, i) => (
          <button key={i} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #1E1E1E', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#F3F0E9' }}>{item.l}</div>
              {item.s && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', marginTop: 2 }}>{item.s}</div>}
            </div>
            <div style={{ color: '#3D3D3B' }}><I.ChevronRight /></div>
          </button>
        ))}
        <div style={{ paddingTop: 32, paddingBottom: 24 }}>
          <button onClick={() => { ctx.setAuth(false); ctx.go('welcome') }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6B1F2B', letterSpacing: '0.04em', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  )
}

// 33. No Outfit
function NoOutfitScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ padding: '4px 24px' }}><BackBtn onClick={() => ctx.back()} /></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 40px' }}>
        <div style={{ flex: 1 }} />
        <div style={{ width: 1, height: 40, background: '#252525', marginBottom: 24 }} />
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.35, marginBottom: 12 }}>
          Сегодня гардероб немного ограничивает варианты
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.7, marginBottom: 40 }}>
          Попробуем подобрать ближайший вариант или изменим условия.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn full variant="secondary" onClick={() => ctx.go('situation')}>Изменить условия</Btn>
          <Btn full onClick={() => ctx.go('outfit-result')}>Посмотреть ближайший вариант</Btn>
          <Btn full variant="ghost" onClick={() => ctx.go('add-item')}>Добавить вещи</Btn>
        </div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  )
}

// 34. Load Error
function LoadErrorScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0D0D0D', padding: '0 40px', textAlign: 'center' }}>
      <div style={{ width: 1, height: 40, background: '#6B1F2B', marginBottom: 24 }} />
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.3, marginBottom: 12 }}>Что-то пошло не так</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.75, marginBottom: 40 }}>
        Не удалось загрузить данные. Проверьте соединение и попробуйте снова.
      </div>
      <Btn onClick={() => ctx.go(ctx.isAuth ? 'home-auth' : 'welcome')}>Попробовать снова</Btn>
    </div>
  )
}

// 35. No Internet
function NoInternetScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0D0D0D', padding: '0 40px', textAlign: 'center' }}>
      <div style={{ color: '#2A2A2A', marginBottom: 28 }}><I.Wifi /></div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#F3F0E9', lineHeight: 1.3, marginBottom: 12 }}>Нет соединения</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.75, marginBottom: 40 }}>
        Проверьте подключение к интернету
      </div>
      <button onClick={() => ctx.go(ctx.isAuth ? 'home-auth' : 'welcome')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: '0.09em', textTransform: 'uppercase', fontWeight: 500, color: '#0D0D0D', background: '#F3F0E9', border: 'none', padding: '14px 24px', borderRadius: 1, cursor: 'pointer' }}>
        <I.Refresh /> Повторить
      </button>
    </div>
  )
}

// 36. Confirm Modal
function ConfirmModalScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D', position: 'relative' }}>
      <StatusBar />
      <div style={{ flex: 1, opacity: 0.2, padding: '12px 16px', overflow: 'hidden' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#F3F0E9', marginBottom: 16 }}>Гардероб</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[IMGS.itemWhiteShirt, IMGS.itemBlackJeans, IMGS.itemCoat, IMGS.itemLoafers, IMGS.itemBlackBag, IMGS.itemGraySuit].map((src, i) => (
            <Img key={i} src={src} alt="item" style={{ height: 90 }} />
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#181818', borderTop: '1px solid #252525', padding: '32px 24px 44px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: '#F3F0E9', marginBottom: 8 }}>Удалить вещь?</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6A6865', lineHeight: 1.7, marginBottom: 28 }}>
          Вещь будет удалена из гардероба. Образы с этой вещью останутся.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn full variant="accent" onClick={() => ctx.go('wardrobe-filled')}>Удалить</Btn>
          <Btn full variant="secondary" onClick={() => ctx.back()}>Отмена</Btn>
        </div>
      </div>
    </div>
  )
}

// 37. Toast Demo
function ToastDemoScreen({ ctx }: { ctx: Ctx }) {
  const toasts = [
    { icon: <I.Check />, color: '#3D6B3D', title: 'Образ сохранён', sub: 'Дождливый вторник добавлен' },
    { icon: <I.X />, color: '#6B1F2B', title: 'Не удалось сохранить', sub: 'Проверьте соединение' },
    { icon: <I.Info />, color: '#4A4845', title: 'Вещь добавлена', sub: 'Гардероб обновлён' },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Системные состояния</Caption>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }} className="scrollbar-hide">
        <Caption style={{ marginBottom: 16 }}>Toast уведомления</Caption>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
          {toasts.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#141414', borderLeft: `2px solid ${t.color}` }}>
              <div style={{ color: t.color, flexShrink: 0 }}>{t.icon}</div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#F3F0E9', fontWeight: 500 }}>{t.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5A5855', marginTop: 2 }}>{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div style={{ paddingTop: 24 }}>
          <Caption style={{ marginBottom: 16 }}>Inline состояния</Caption>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { c: '#3D6B3D', t: 'Образ сохранён в коллекцию' },
              { c: '#6B1F2B', t: 'Не удалось распознать вещь' },
              { c: '#4A4845', t: 'Образ уже был сохранён ранее' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.c, flexShrink: 0, marginTop: 5 }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#F3F0E9' }}>{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 38. UI Kit
function UIKitScreen({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0D0D' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 24px' }}>
        <BackBtn onClick={() => ctx.back()} />
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: '#F3F0E9' }}>Shine UI Kit</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }} className="scrollbar-hide">

        <section style={{ padding: '20px 0', borderBottom: '1px solid #1E1E1E' }}>
          <Caption style={{ marginBottom: 16 }}>01 — Цвета</Caption>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              { c: '#0D0D0D', l: 'BG', b: true }, { c: '#171717', l: 'BG2' }, { c: '#1D1D1D', l: 'BG3' },
              { c: '#F3F0E9', l: 'FG' }, { c: '#8A8680', l: 'FG2' }, { c: '#4A4845', l: 'FG3' },
              { c: '#6B1F2B', l: 'Accent' }, { c: '#8B2D3B', l: 'Accent2' }, { c: '#252525', l: 'Border' },
            ].map(col => (
              <div key={col.l} style={{ textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, background: col.c, border: col.b ? '1px solid #252525' : 'none' }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: '#5A5855', marginTop: 5 }}>{col.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '20px 0', borderBottom: '1px solid #1E1E1E' }}>
          <Caption style={{ marginBottom: 20 }}>02 — Типографика</Caption>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { f: "'Playfair Display', serif", sz: 50, fw: 400, fi: false, t: 'Display', i: 'Playfair · 50 · 400' },
              { f: "'Playfair Display', serif", sz: 34, fw: 400, fi: true, t: 'Heading Italic', i: 'Playfair · 34 · Italic' },
              { f: "'Playfair Display', serif", sz: 22, fw: 400, fi: false, t: 'Section Title', i: 'Playfair · 22 · 400' },
              { f: "'DM Sans', sans-serif", sz: 16, fw: 500, fi: false, t: 'Body Medium', i: 'DM Sans · 16 · 500' },
              { f: "'DM Sans', sans-serif", sz: 14, fw: 400, fi: false, t: 'Body Regular', i: 'DM Sans · 14 · 400', c: '#8A8680' },
            ].map((ty, i) => (
              <div key={i}>
                <div style={{ fontFamily: ty.f, fontSize: ty.sz, fontWeight: ty.fw, fontStyle: ty.fi ? 'italic' : 'normal', color: (ty as { c?: string }).c || '#F3F0E9', lineHeight: 1 }}>{ty.t}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: '#3D3D3B', marginTop: 4 }}>{ty.i}</div>
              </div>
            ))}
            <div><Caption>Caption / Label · 10px · uppercase</Caption></div>
          </div>
        </section>

        <section style={{ padding: '20px 0', borderBottom: '1px solid #1E1E1E' }}>
          <Caption style={{ marginBottom: 16 }}>03 — Отступы</Caption>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[4, 8, 12, 16, 24, 32, 40, 48, 64].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: s, height: 4, background: '#6B1F2B', flexShrink: 0 }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#5A5855' }}>{s}px</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '20px 0', borderBottom: '1px solid #1E1E1E' }}>
          <Caption style={{ marginBottom: 16 }}>04 — Кнопки</Caption>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn full>Primary — Подобрать образ</Btn>
            <Btn full variant="secondary">Secondary — Другой вариант</Btn>
            <Btn full variant="ghost">Ghost — Пропустить</Btn>
            <Btn full variant="accent">Accent — Удалить</Btn>
          </div>
        </section>

        <section style={{ padding: '20px 0', borderBottom: '1px solid #1E1E1E' }}>
          <Caption style={{ marginBottom: 14 }}>05 — Теги и фильтры</Caption>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Tag>Обычный</Tag><Tag active>Активный</Tag><Tag>Работа</Tag><Tag>Верх</Tag><Tag active>Кэжуал</Tag>
          </div>
        </section>

        <section style={{ padding: '20px 0', borderBottom: '1px solid #1E1E1E' }}>
          <Caption style={{ marginBottom: 14 }}>06 — Изображения</Caption>
          <div style={{ display: 'flex', gap: 8 }}>
            <Img src={IMGS.itemWhiteShirt} alt="item" style={{ width: 72, height: 90 }} />
            <Img src={IMGS.editorialBlazer} alt="outfit" style={{ width: 110, height: 90 }} />
            <Ph label={"Фото\nпользователя"} style={{ flex: 1, height: 90 }} />
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#3D3D3B', marginTop: 8 }}>
            Img — реальные Unsplash фото · Ph — плейсхолдер для пользовательских фото
          </div>
        </section>

        <section style={{ padding: '20px 0', borderBottom: '1px solid #1E1E1E' }}>
          <Caption style={{ marginBottom: 14 }}>07 — Иконки (outline, 1.5px)</Caption>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', color: '#F3F0E9' }}>
            <I.Home /><I.Hanger /><I.Layers /><I.User /><I.Plus /><I.Camera />
            <I.Image /><I.Edit /><I.Trash /><I.ChevronRight /><I.ChevronLeft /><I.Check /><I.X /><I.Refresh /><I.Info />
          </div>
        </section>

        <section style={{ padding: '20px 0' }}>
          <Caption style={{ marginBottom: 14 }}>08 — Скругления</Caption>
          <div style={{ display: 'flex', gap: 16 }}>
            {[{ r: 0, l: '0px — основной' }, { r: 2, l: '2px — мелкие' }].map(c => (
              <div key={c.l}>
                <div style={{ width: 64, height: 44, background: '#1A1A1A', borderRadius: c.r, border: '1px solid #252525' }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#5A5855', marginTop: 6 }}>{c.l}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}

// ─── Navigator ───────────────────────────────────────────────────────────────

const ALL_SCREENS: { group: string; screens: { id: Screen; label: string }[] }[] = [
  { group: 'Онбординг', screens: [{ id: 'splash', label: 'Splash' }, { id: 'welcome', label: 'Знакомство' }, { id: 'personalize', label: 'Персонализация' }, { id: 'photo-upload', label: 'Загрузка фото' }, { id: 'ai-reaction', label: 'Реакция ИИ' }] },
  { group: 'Главная', screens: [{ id: 'home-auth', label: 'Главная' }] },
  { group: 'Подбор образа', screens: [{ id: 'situation', label: 'Ситуация' }, { id: 'wardrobe-source', label: 'Источник' }, { id: 'template-wardrobe', label: 'Шаблонный гардероб' }, { id: 'outfit-loading', label: 'Загрузка образа' }, { id: 'outfit-result', label: 'Результат' }, { id: 'outfit-adjustments', label: 'Корректировка' }, { id: 'outfit-alternative', label: 'Альтернатива' }, { id: 'replace-item', label: 'Замена вещи' }] },
  { group: 'Гардероб', screens: [{ id: 'wardrobe-filled', label: 'Заполненный' }, { id: 'wardrobe-empty', label: 'Пустой' }, { id: 'add-item', label: 'Добавить вещь' }, { id: 'item-recognition', label: 'Распознавание' }, { id: 'recognition-result', label: 'Результат' }, { id: 'recognition-error', label: 'Ошибка распознавания' }, { id: 'item-card', label: 'Карточка вещи' }] },
  { group: 'Образы', screens: [{ id: 'saved-outfits', label: 'Сохранённые образы' }, { id: 'saved-empty', label: 'Пустое состояние' }, { id: 'outfit-detail', label: 'Детали образа' }] },
  { group: 'Аккаунт', screens: [{ id: 'save-success', label: 'Образ сохранён' }, { id: 'save-guest', label: 'Сохранение (гость)' }, { id: 'register', label: 'Регистрация' }, { id: 'login', label: 'Вход' }] },
  { group: 'Профиль', screens: [{ id: 'profile', label: 'Профиль' }, { id: 'style-prefs', label: 'Предпочтения стиля' }, { id: 'settings', label: 'Настройки' }] },
  { group: 'Состояния', screens: [{ id: 'no-outfit', label: 'Нет образа' }, { id: 'load-error', label: 'Ошибка загрузки' }, { id: 'no-internet', label: 'Нет интернета' }, { id: 'confirm-modal', label: 'Подтверждение удаления' }, { id: 'toast-demo', label: 'Toast / Success / Error' }] },
  { group: 'UI Kit', screens: [{ id: 'ui-kit', label: 'Shine UI Kit' }] },
]

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [history, setHistory] = useState<Screen[]>(['splash'])
  const [isAuth, setIsAuth] = useState(false)
  const [userName, setUserName] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [showNav, setShowNav] = useState(false)

  const screen = history[history.length - 1]

  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setHistory(['welcome']), 3000)
      return () => clearTimeout(t)
    }
  }, [screen])

  const ctx: Ctx = {
    go: (s: Screen) => setHistory(prev => [...prev, s]),
    back: () => setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev),
    isAuth,
    setAuth: setIsAuth,
    userName,
    setUserName,
    hasPhoto,
    setHasPhoto,
  }

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen />
      case 'welcome': return <WelcomeScreen ctx={ctx} />
      case 'personalize': return <PersonalizeScreen ctx={ctx} />
      case 'photo-upload': return <PhotoUploadScreen ctx={ctx} />
      case 'ai-reaction': return <AIReactionScreen ctx={ctx} />
      case 'home-auth': return <HomeAuthScreen ctx={ctx} />
      case 'situation': return <SituationScreen ctx={ctx} />
      case 'wardrobe-source': return <WardrobeSourceScreen ctx={ctx} />
      case 'template-wardrobe': return <TemplateWardrobeScreen ctx={ctx} />
      case 'wardrobe-filled': return <WardrobeFilledScreen ctx={ctx} />
      case 'wardrobe-empty': return <WardrobeEmptyScreen ctx={ctx} />
      case 'add-item': return <AddItemScreen ctx={ctx} />
      case 'item-recognition': return <ItemRecognitionScreen ctx={ctx} />
      case 'recognition-result': return <RecognitionResultScreen ctx={ctx} />
      case 'recognition-error': return <RecognitionErrorScreen ctx={ctx} />
      case 'item-card': return <ItemCardScreen ctx={ctx} />
      case 'outfit-loading': return <OutfitLoadingScreen ctx={ctx} />
      case 'outfit-result': return <OutfitResultScreen ctx={ctx} />
      case 'outfit-adjustments': return <OutfitAdjustmentsScreen ctx={ctx} />
      case 'outfit-alternative': return <OutfitAlternativeScreen ctx={ctx} />
      case 'replace-item': return <ReplaceItemScreen ctx={ctx} />
      case 'save-success': return <SaveSuccessScreen ctx={ctx} />
      case 'save-guest': return <SaveGuestScreen ctx={ctx} />
      case 'register': return <RegisterScreen ctx={ctx} />
      case 'login': return <LoginScreen ctx={ctx} />
      case 'saved-outfits': return <SavedOutfitsScreen ctx={ctx} />
      case 'saved-empty': return <SavedEmptyScreen ctx={ctx} />
      case 'outfit-detail': return <OutfitDetailScreen ctx={ctx} />
      case 'profile': return <ProfileScreen ctx={ctx} />
      case 'style-prefs': return <StylePrefsScreen ctx={ctx} />
      case 'settings': return <SettingsScreen ctx={ctx} />
      case 'no-outfit': return <NoOutfitScreen ctx={ctx} />
      case 'load-error': return <LoadErrorScreen ctx={ctx} />
      case 'no-internet': return <NoInternetScreen ctx={ctx} />
      case 'confirm-modal': return <ConfirmModalScreen ctx={ctx} />
      case 'toast-demo': return <ToastDemoScreen ctx={ctx} />
      case 'ui-kit': return <UIKitScreen ctx={ctx} />
      default: return <SplashScreen />
    }
  }

  const currentLabel = ALL_SCREENS.flatMap(g => g.screens).find(s => s.id === screen)?.label || screen

  return (
    <div style={{ minHeight: '100vh', background: '#040404', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Phone frame */}
      <div style={{
        width: 390,
        height: 844,
        background: '#0D0D0D',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 44,
        boxShadow: '0 0 0 10px #111, 0 0 0 11px #1E1E1E, 0 40px 100px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)',
        border: '1px solid #2A2A2A',
      }}>
        {/* Side buttons */}
        <div style={{ position: 'absolute', right: -11, top: 140, width: 10, height: 56, background: '#111', borderRadius: '0 4px 4px 0', border: '1px solid #1E1E1E', borderLeft: 'none' }} />
        <div style={{ position: 'absolute', left: -11, top: 120, width: 10, height: 36, background: '#111', borderRadius: '4px 0 0 4px', border: '1px solid #1E1E1E', borderRight: 'none' }} />
        <div style={{ position: 'absolute', left: -11, top: 170, width: 10, height: 56, background: '#111', borderRadius: '4px 0 0 4px', border: '1px solid #1E1E1E', borderRight: 'none' }} />
        <div style={{ position: 'absolute', left: -11, top: 238, width: 10, height: 56, background: '#111', borderRadius: '4px 0 0 4px', border: '1px solid #1E1E1E', borderRight: 'none' }} />

        {/* Screen clipping */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 44 }}>
          {renderScreen()}
        </div>
      </div>

      {/* Screen navigator */}
      <div style={{ marginTop: 16, width: 390 }}>
        <button onClick={() => setShowNav(p => !p)}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#0D0D0D', border: '1px solid #1E1E1E', cursor: 'pointer', color: '#F3F0E9' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5A5855' }}>
            Экран: <span style={{ color: '#F3F0E9' }}>{currentLabel}</span>
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#5A5855', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {showNav ? 'Скрыть ▲' : 'Все экраны ▼'}
          </span>
        </button>

        {showNav && (
          <div style={{ background: '#0A0A0A', border: '1px solid #1A1A1A', borderTop: 'none', maxHeight: 320, overflowY: 'auto', padding: '8px 0' }}>
            {ALL_SCREENS.map(group => (
              <div key={group.group}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#333', padding: '10px 16px 6px' }}>
                  {group.group}
                </div>
                {group.screens.map(s => (
                  <button key={s.id} onClick={() => { ctx.go(s.id); setShowNav(false) }}
                    style={{ width: '100%', textAlign: 'left', padding: '8px 16px', background: screen === s.id ? '#141414' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: screen === s.id ? '#F3F0E9' : '#5A5855', borderLeft: screen === s.id ? '2px solid #6B1F2B' : '2px solid transparent' }}>
                    {s.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
