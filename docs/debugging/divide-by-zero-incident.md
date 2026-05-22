# Divide By Zero Incident

## Incident Summary
A runtime error occurred while calculating average account age during summary generation.

## Initial Symptom
The API returned a 500 Internal Server Error for users with zero linked accounts.

## First Hypothesis
I initially suspected malformed account timestamps or invalid date parsing.

## Investigation
I reviewed logs and reproduced the issue locally using an empty accounts array.

The failing logic:

```js
average = totalAge / count
