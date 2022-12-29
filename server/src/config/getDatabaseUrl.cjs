const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/human-or-ai_development",
      test: "postgres://postgres:postgres@localhost:5432/human-or-ai_test",
      e2e: "postgres://postgres:postgres@localhost:5432/human-or-ai_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
