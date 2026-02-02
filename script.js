<script>
  const skills = document.querySelectorAll('.skills-list span');

  skills.forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      skill.style.transition = '0.4s ease';
      skill.style.opacity = '1';
      skill.style.transform = 'translateX(0)';
    }, index * 120);
  });
</script>
