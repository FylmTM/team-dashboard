package me.vrublevsky.team.dashboard.slack

import com.fasterxml.jackson.annotation.JsonProperty

data class SlackMessageRequest(
        val attachments: List<SlackMessageAttachment>
)

data class SlackMessageAttachment(
        val title: String
) {
    @JsonProperty("title_link")
    var titleLink: String? = null
    var color: String? = null
    var text: String? = null
    var pretext: String? = null
    var ts: Long? = null
    var fields: List<SlackMessageAttachmentField> = ArrayList()
}

data class SlackMessageAttachmentField(
        val title: String,
        val value: String,
        val short: Boolean = true
)