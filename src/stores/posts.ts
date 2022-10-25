import { DateTime } from "luxon";
import { defineStore } from "pinia";
import { Period } from "../constants";
import { Post, today, thisMonth, thisWeek, TimelinePost } from "../posts";

interface PostState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}
function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500));
}

export const usePosts = defineStore("posts", {
  state: (): PostState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    all: new Map(),
    selectedPeriod: "Today",
  }),

  getters: {
    filteredPosts: (state: PostState): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);

          if (!post) {
            throw Error("no post");
          }
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 });
          }
          if (state.selectedPeriod === "This Week") {
            return post.created >= DateTime.now().minus({ week: 1 });
          }
          return post;
        });
    },
  },

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },
    async fetchPosts() {
      const res = await window.fetch("http://localhost:8002/posts");
      const data = (await res.json()) as Post[];
      await delay();

      let ids: string[] = [];
      let all = new Map<string, Post>();
      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },
    async createPost(post: TimelinePost) {
      const body = JSON.stringify({ ...post, created: post.created.toISO() });
      return await window.fetch("http://localhost:8002/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
  },
});
