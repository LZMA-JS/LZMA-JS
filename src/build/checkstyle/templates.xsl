<?xml version="1.0" encoding="ISO-8859-1"?>

<!-- $Id$ -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:template name="strip-prefix">
        <xsl:param name="prefix"/>
        <xsl:param name="string"/>
        <xsl:choose>
            <xsl:when test="starts-with($string, $prefix)">
                <xsl:value-of select="substring-after($string, $prefix)"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$string"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>

