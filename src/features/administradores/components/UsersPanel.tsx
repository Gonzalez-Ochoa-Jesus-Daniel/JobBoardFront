import type { UserCard } from '../types/usersDashboard.types'

type UsersPanelProps = {
  cards: UserCard[]
}

function UsersPanel({ cards }: UsersPanelProps) {
  const maxCount = Math.max(...cards.map((card) => card.count), 1)

  return (
    <section className="panel users-panel" id="usuarios">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Usuarios del sistema</p>
          <h2>Distribucion por tipo</h2>
        </div>
      </div>

      <div className="user-distribution">
        {cards.map((userCard) => {
          const percentage = Math.max((userCard.count / maxCount) * 100, userCard.count > 0 ? 5 : 0)

          return (
            <article key={userCard.title} className={`user-distribution-row tone-${userCard.tone}`}>
              <div className="user-distribution-copy">
                <span>{userCard.indicator}</span>
                <strong>{userCard.title}</strong>
                <p>{userCard.description}</p>
              </div>

              <div className="user-distribution-metric">
                <strong>{userCard.count}</strong>
                <span className="user-distribution-track" aria-hidden="true">
                  <span style={{ width: `${percentage}%` }} />
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default UsersPanel
