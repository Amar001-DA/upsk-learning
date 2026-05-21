cat > code-review.md <<'EOF'
# Code Review: Add user summary generation

## Decision

I chose an inline-comment review style because this PR contains a correctness issue that should be tied directly to the affected line, along with several readability improvements that are easier to understand in local context. I also included a short structured summary so the feedback feels prioritized instead of overwhelming.

---

## Strengths

- Nice job keeping this function self-contained with no side effects. It only processes input and returns a result, which makes the behavior predictable and easier to test.
- The docstring is minimal but still helpful for quickly understanding the function’s intent.
- The health classification logic captures a meaningful business concept instead of scattering conditions throughout the code.

---

## Required Changes (Bugs)

### Inline Comment — Average Calculation

```python
d["average_account_age"] = total_age / cnt
