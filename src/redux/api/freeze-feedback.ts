import { api } from "./core"

interface FeedbackResponse {
  choiceReason: string
  reason: string
  id: number
}

const freezeFeedbackApi = api.injectEndpoints({
  endpoints: (build) => ({
    giveFreezeFeedback: build.mutation<
      FeedbackResponse,
      { choice_reason: string; reason: string }
    >({
      query: (body) => ({
        url: "subscription-freeze-form-answer/",
        method: "POST",
        body,
      }),
    }),
    updateFreezeFeedback: build.mutation<
      FeedbackResponse,
      { choice_reason: string; reason: string; feedbackId: number }
    >({
      query: ({ reason, choice_reason, feedbackId }) => ({
        url: `subscription-freeze-form-answer/${feedbackId}/`,
        method: "PATCH",
        body: { reason, choice_reason },
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGiveFreezeFeedbackMutation,
  useUpdateFreezeFeedbackMutation,
} = freezeFeedbackApi
