
export default function SkeletonFeedItem() {
  return (
    <article className="feed-item">
      <div className="feed-avatar skel" aria-hidden="true" />
      <div>
        <div className="skel skel-line" style={{ width:'40%', height:18, marginBottom:6 }} />
        <div className="skel skel-line" style={{ width:'65%', marginBottom:6 }} />
        <div className="skel skel-line" style={{ width:'90%', marginBottom:6 }} />
        <div className="skel skel-line" style={{ width:'55%' }} />
      </div>
    </article>
  );
}


//veriler gelirken gösterilen iskelet yapılar