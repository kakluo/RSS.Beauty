<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <xsl:variable name="title"><xsl:value-of select="/rss/channel/title" /></xsl:variable>
    <xsl:variable name="description"><xsl:value-of select="/rss/channel/description" /></xsl:variable>
    <xsl:variable name="link"><xsl:value-of select="/rss/channel/link" /></xsl:variable>

    {{> rss }}
  </xsl:template>
</xsl:stylesheet>