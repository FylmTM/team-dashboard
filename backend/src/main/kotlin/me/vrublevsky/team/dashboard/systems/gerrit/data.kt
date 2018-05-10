package me.vrublevsky.team.dashboard.systems.gerrit

import java.util.*

data class GerritChange(
        val project: String,
        val subject: String,
        val created: Date,
        val updated: Date,
        val insertions: Int,
        val deletions: Int
)
