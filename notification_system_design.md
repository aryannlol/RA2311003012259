# Stage 1: Notification System Design

## Overview
The Campus Notification Platform aims to deliver critical updates to students regarding Placements, Results, and Events. To solve the issue of notification fatigue, we have implemented a **Priority Inbox** that highlights the most significant updates based on institutional importance and temporal relevance.

## Priority Logic Implementation
Our approach utilizes a multi-tiered sorting strategy to ensure that "High Stakes" notifications are seen first, without burying recent updates.

### 1. Categorical Weighting
Each notification type is assigned a weight based on its impact on the student's career and academic path:
- **Placement**: Weight 3 (Critical)
- **Result**: Weight 2 (High)
- **Event**: Weight 1 (Standard)

### 2. Temporal Relevance (Recency)
Within each weight category, notifications are sorted by their `Timestamp` in descending order. This ensures that the most recent results or placement drives are at the top of their respective tiers.

### 3. Final Sorting Algorithm
The `calculateUrgencyScores` function implements the following logic:
1.  Map the `Type` string to its numerical weight.
2.  Perform a primary sort on the `Weight` (Descending).
3.  Perform a secondary sort on the `Timestamp` (Descending) for items with equal weight.
4.  Truncate the list to return the top 'n' (default 10) notifications.

## Unique Architecture
To ensure code originality and modularity, we have abstracted the sorting logic into a standalone utility function named `processPriorityStream`. This allows for future-proofing should the weighting criteria change (e.g., adding "Holiday" or "Urgent Alert" types).

## Performance Considerations
- **Memory Efficiency**: Since the sorting happens on a fetched array (not a database query at this stage), we use an in-place sort followed by a slice to minimize memory overhead.
- **Scalability**: The weighting system is designed as a Map, allowing $O(1)$ lookup for category weights.
