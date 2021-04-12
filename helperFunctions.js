function rankingQueryMaker(userId, userPool, rankingType) {
  let eligibleUsers;

  if (userPool === "global") {
    eligibleUsers = `users u`;
  } else if (userPool === "friends") {
    eligibleUsers = `(SELECT u.*
    FROM users u
    LEFT JOIN (SELECT u.id
    FROM user_friend_relationships f
    JOIN users u
    ON f.id_user_friend = u.id
    WHERE f.id_user = ${userId}) f
    ON u.id = f.id
    WHERE f.id is not null OR u.id = ${userId}) u`;
  }

  return `select total, rank, count(id)
  from
    (select u.id, u.username, count(q.id) as total,
    ${rankingType} () over (order by count(q.id) desc) rank
    from ${eligibleUsers}
    left join user_completed_quizzes q
    on q.id_users = u.id
    -- could add quiz id criteria here
    group by 1,2) rankings
  where id = ${userId}
  group by 1,2`;
}

function ordinalSuffix(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

module.exports = { rankingQueryMaker, ordinalSuffix };
